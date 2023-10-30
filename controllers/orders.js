const Order = require('../models/order');
const Item = require('../models/item');

module.exports = {
  cart,
  addToCart,
  setItemQtyInCart,
  checkout,
  history,
  deleteOrder,
};

async function cart(req, res) {
  const cart = await Order.getCart(req.user._id);
  res.json(cart);
}

async function addToCart(req, res) {
  const cart = await Order.getCart(req.user._id);
  await cart.addItemToCart(req.params.id);
  res.json(cart);
}

async function setItemQtyInCart(req, res) {
  const cart = await Order.getCart(req.user._id);
  await cart.setItemQty(req.body.itemId, req.body.newQty);
  res.json(cart);
}

async function checkout(req, res) {
  const cart = await Order.getCart(req.user._id);
  cart.isPaid = true;
  await cart.save();
  res.json(cart);
}

async function history(req, res) {
  const orders = await Order.find({ user: req.user._id, isPaid: true }).sort({ createdAt: -1 });
  res.json(orders);
}

async function deleteOrder(req, res) {
  console.log(req.params.id)
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    console.log(deleteOrder)
    if (!deletedOrder) {
      return res.status(405).json({ message: 'Order not found' });
    }
    res.json(deletedOrder);
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
