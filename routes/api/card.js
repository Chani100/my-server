const express = require("express");
const router = express.Router();
const cardsServiceModel = require("../../model/cards/cardService");
const cardValidatrService = require("../../validation/cardValidtionService");
const normaliztionCard = require("../../model/cards/helpers/normalitionCard");
const authmw = require("../../middleware/authMiddleware");
const permissionsMiddleware = require("../../middleware/permissionsMiddleware");

router.post("/", authmw, async (req, res) => {
  try {
    await cardValidatrService.creatCardValidation(req.body);
    let normalCard = await normaliztionCard(req.body);
    const dataFromMongoose = await cardsServiceModel.createCard(normalCard);
    res.json({ mgs: "Ticket successfully created" });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const allCards = await cardsServiceModel.getAllCards();
    res.json(allCards);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    await cardValidatrService.creatCardValidation(req.body);
    const getId = await cardsServiceModel.getCardById(req.params.id);
    res.json(getId);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    await cardValidatrService.creatCardValidation(req.body);
    let normalCard = await normaliztionCard(req.body);
    const putUpdateCard = await cardsServiceModel.updatCard(
      req.params.id,
      req.body
    );
    res.json("update card");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", authmw, permissionsMiddleware(false, true, false), async (req, res) => {
  try {
    await cardValidatrService.creatCardValidation(req.body);
    const deleteCard = await cardsServiceModel.DeleteCard(req.params.id);
    if (deleteCard) {
      res.json({ mgs: "card delete" });
    } else {
      res.json("cold not find the card");
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
