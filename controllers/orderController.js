const Order = require("../models/orderModel");
const OrderService = require("../services/orderService");

class OrderController {
    static async createOrder(req, res) {
        try {
            const { order_date, order_status, user_id, machine_id } = req.body;
            console.log(user_id)
            const order = new Order(0,user_id, machine_id,order_date, order_status);
            const result = await OrderService.createOrder(order);
            res.status(201).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                const message = e.message.includes('User') ? 'User not found' : 'Machine not found';
                res.status(e.statusCode).json({ message, error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }
    

    static async getOrder(req, res) {
        try {
            const { order_id } = req.params;
            const result = await OrderService.getOrder(order_id);
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'Order not found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async getAllOrders(req, res) {
        try {
            const result = await OrderService.getAllOrders();
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'No orders found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async updateOrder(req, res) {
        try {
            const { order_id } = req.params;
            const  updates  = req.body;
            const result = await OrderService.updateOrder(order_id, updates);
            res.status(204).json(result);
        } catch (e) {
            if (e.statusCode === 400) {
                res.status(e.statusCode).json({ message: 'Invalid status', error: e.message });
            } else if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'Order not found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async getOrdersByUser(req, res) {
        try {
            const { user_id } = req.params;
            console.log(user_id)
            const result = await OrderService.getOrdersByUser(user_id);
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'No orders found for this user', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }
    static async getOrderByStatus(req,res){
        try {
            const{status}=req.body;
            const result=await OrderService.getOrdersByStatus(status)
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'No orders found for this user', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }
    static async getOrdersByMachine(req, res) {
        try {
            const { machine_id } = req.params;
            const result = await OrderService.getOrdersByMachine(machine_id);
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'No orders found for this machine', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }
    static async deleteOrder(req, res) {
        try {
            const { order_id } = req.params;
            const result = await OrderService.deleteOrder(order_id);
            res.status(204).json(result);
            
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'Order not found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }
}

module.exports = OrderController;