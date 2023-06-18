const express = require("express");
const authRouter = require("./api/users");
const router = express.Router();
const cardRouter = require("./api/cards");

router.get("/", (req, res) => {
  res.json({ msg: "sub router" });
});



router.use("/cards", cardRouter);
router.use("/users", authRouter);

module.exports = router;
