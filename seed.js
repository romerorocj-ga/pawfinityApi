require('dotenv').config();
require('./config/database');

const Category = require('./models/category');
const Item = require('./models/item');

(async function () {
  await Category.deleteMany({});
  const categories = await Category.create([
    { name: 'Dogs', sortOrder: 10 },
    { name: 'Cats', sortOrder: 20 },
    { name: 'Birds', sortOrder: 30 },
    { name: 'Fish', sortOrder: 40 },
    { name: 'Insects', sortOrder: 50 },
    { name: 'Reptiles', sortOrder: 60 },
  ]);

  await Item.deleteMany({});
  const items = await Item.create([
    { name: 'Poodle', emoji: '🐩', category: categories[0], price: 15.95 },
    { name: 'Akita', emoji: '🐕', category: categories[0], price: 20.95 },
    {
      name: 'Golden Retriever',
      emoji: '🦮',
      category: categories[0],
      price: 10.95,
    },
    { name: 'Tabby Cat', emoji: '🐈', category: categories[1], price: 15.0 },
    { name: 'Black Cat', emoji: '🐈‍⬛', category: categories[1], price: 18.0 },
    { name: 'Parrot', emoji: '🦜', category: categories[2], price: 11.5 },
    { name: 'Dove', emoji: '🕊️', category: categories[2], price: 8.75 },
    { name: 'Owl', emoji: '🦉', category: categories[2], price: 21.0 },
    { name: 'Fish', emoji: '🐟 ', category: categories[3], price: 3.99 },
    { name: 'Blow Fish', emoji: ' 🐡', category: categories[3], price: 4.99 },
    {
      name: 'Tropical Fish',
      emoji: '🐠 ',
      category: categories[3],
      price: 5.99,
    },
    { name: 'Ant', emoji: ' 🐜 ', category: categories[4], price: 1.0 },
    { name: 'Spider', emoji: '🕷️', category: categories[4], price: 4.95 },
    { name: 'Butterfly', emoji: '🦋 ', category: categories[4], price: 2.0 },
    { name: 'Lizard', emoji: '🦎', category: categories[5], price: 2.95 },
    { name: 'Snake', emoji: '🐍', category: categories[5], price: 3.95 },
    { name: 'Turtle', emoji: '🐢 ', category: categories[6], price: 0.95 },
  ]);

  console.log(items);

  process.exit();
})();
