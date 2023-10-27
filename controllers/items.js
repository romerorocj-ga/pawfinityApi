const Item = require('../models/item');

module.exports = {
  index,
  show,
};

async function index(req, res) {
  try {
    console.log('index');
    const items = await Item.find({}).sort('name').populate('category').exec();

    items.forEach((item) => {
      if (!item.category || typeof item.category.sortOrder !== 'number') {
        item.category = { sortOrder: 0 };
      }
    });

    items.sort((a, b) => a.category.sortOrder - b.category.sortOrder);

    console.log('Items sent:', items);
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function show(req, res) {
  const item = await Item.findById(req.params.id);
  console.log('Item sent:', item);
  res.json(item);
}
