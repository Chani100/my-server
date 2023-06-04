const Card = require("./Card");


const createCard = async (cardToSave) => {
  let card = new Card(cardToSave);
  return card.save();
};

const getAllCards = () => {
  return Card.find();
};

const getCardById = (id) => {
  return Card.findById(id);
};

const getCardByBizNumbeer = (bizNumber) => {
  return Card.findOne({ bizNumber }, { bizNumber: 1, _id: 0 });
};
const updatCard = async (id, cardToUpdat) => {
  return Card.findByIdAndUpdate(id, cardToUpdat, { new: true });
};

const DeleteCard = (id) => {
  return Card.findByIdAndDelete(id);
};

module.exports = {
  DeleteCard,
  createCard,
  getAllCards,
  getCardById,
  updatCard,
  getCardByBizNumbeer,
};
