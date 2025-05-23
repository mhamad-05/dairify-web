const express = require('express');
const OrderController = require('../controllers/orderController');
const { 
  validateOrder, 
  validateOrderIDParam, 
  validateOrderUpdate 
} = require('../validators/orderDTO');
const { route } = require('./antibioticRoute');

const router = express.Router();

router.post('/', validateOrder, OrderController.createOrder);
router.get('/:order_id', validateOrderIDParam, OrderController.getOrder);
router.get('/', OrderController.getAllOrders);
router.put('/:order_id', validateOrderUpdate, OrderController.updateOrder);
router.get('/user/:user_id', OrderController.getOrdersByUser);
router.get('/get/status', OrderController.getOrderByStatus);//add validation for status
router.delete('/:order_id', validateOrderIDParam, OrderController.deleteOrder);
router.get('/machine/:machine_id', OrderController.getOrdersByMachine);

module.exports = router;