const express = require('express');
const router = express.Router();
const ordersCtrl = require('../controllers/orders');

router.get('/cart', ordersCtrl.cart);
router.post('/cart/items/:id', ordersCtrl.addToCart);
router.post('/cart/checkout', ordersCtrl.checkout);
router.put('/cart/qty', ordersCtrl.setItemQtyInCart);
router.get('/history', ordersCtrl.history);
router.delete('/:id', ordersCtrl.deleteOrder);


module.exports = router;
