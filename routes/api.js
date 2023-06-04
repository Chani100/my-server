const express = require("express");
const authRouter = require("./api/auth");
const router = express.Router();
const cardRouter = require("./api/card");

router.get("/", (req, res) => {
  res.json({ msg: "sub router" });
});



router.use("/card", cardRouter);
router.use("/auth", authRouter);

module.exports = router;
