const express = require("express");
const router = express.Router();
const bcrypt = require("../../config/bcrypt");
const {
  registerUserValidation,
  validateLoginSchema,
} = require("../../validation/authValidationService");
const normalizeUser = require("../../model/users/helpers/normalitionUsea");
const usersServiceModel = require("../../model/users/usersService");
const { generateToken } = require("../../config/jwt");
const CustomError = require("../../utils/CustomError");


router.post("/register", async (req, res) => {
  try {
    await registerUserValidation(req.body);
    req.body.password = await bcrypt.generateHash(req.body.password);
    req.body = normalizeUser(req.body);
    await usersServiceModel.registerUser(req.body);
    res.json({ msg: "register" });
  } catch (err) {
    res.status(400).json(err);
  }
});


router.post("/login", async(req, res)=>{
try{
  await validateLoginSchema(req.body);
 const userData = await usersServiceModel.getUserByEmail(req.body.email)
 if (!userData) throw  new CustomError ("invalid email and/or password");
 const isPasswordMatch = await bcrypt.cmpHash(
   req.body.password,
   userData.password
 );
 if (!isPasswordMatch) throw  new CustomError ("invalid email and/or password");
  const token = await generateToken({
    _id: userData._id,
    isAdmin: userData.isAdmin,
    isBusiness: userData.isBusiness,
  });
   res.json({ token });
 res.json({ msg: "lodin" });

}catch(err){
 res.status(400).json(err);
}

})

module.exports = router;
