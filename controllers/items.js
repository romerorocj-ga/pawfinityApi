const Item = require('../models/item');

module.exports = {
  index,
  show,
};

async function index(req, res) {
  const items = await Item.find({}).sort('name').populate('category').exec();
  items.sort((a, b) => a.category.sortOrder - b.category.sortOrder);
  console.log('Items sent:', items);
  res.json(items);
}

async function show(req, res) {
  const item = await Item.findById(req.params.id);
  console.log('Cart sent:', cart);
  res.json(item);
}
