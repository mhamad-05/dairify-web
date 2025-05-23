const Order = require("../models/orderModel");
const database = require("../config/db");
require('dotenv').config();

class OrderRepository {

    static async createOrder(order) {
        try {
            let sql = `INSERT INTO \`order\` 
            (order_date, order_status, user_id, machine_id)
            VALUES (?,?,?,?)`;
            
            const result = await database.query(sql, [
                order.order_date,
                order.order_status || 'pending',
                order.user_id,
                order.machine_id
            ]);
            const { affectedRows, insertId } = result;
            return {
                affectedRows,
                insertId: insertId.toString()
            };
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async getOrder(order_id) {
        if (!await this.orderExists(order_id)) {
            const error = new Error("Order does not exist");
            error.statusCode = 404;
            throw error;
        }
        try {
            let sql = `SELECT * FROM \`order\` WHERE order_id = ?`;
            const [row] = await database.query(sql, [order_id]);
            return Order.fromRow(row);
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async getAllOrders() {
        try {
            let sql = `SELECT * FROM \`order\``;
            const rows = await database.query(sql);
            if (!rows || rows.length === 0) {
                const error = new Error("No orders exist");
                error.statusCode = 404;
                throw error;
            }
            return rows.map(Order.fromRow);
        } catch (e) {
            throw e;
        }
    }

    static async updateOrder(order_id, updates) {
        if (!await this.orderExists(order_id)) {
            const error = new Error("Order does not exist");
            error.statusCode = 404;
            throw error;
        }
        if (!updates || Object.keys(updates).length === 0) {
            const error = new Error("No updates provided");
            error.statusCode = 400; 
            throw error;
        }

        try {
            let sql = "UPDATE `order` SET ";
            let conditions = [];
            let values = [];

            for (const key in updates) {
                conditions.push(`${key} = ?`);
                values.push(updates[key]);
            }

            sql += conditions.join(", ");
            sql += " WHERE order_id = ?";
            values.push(order_id);

            const result = await database.query(sql, values);
            const { affectedRows } = result;

            return { affectedRows };
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async deleteOrder(order_id) {
        if (!await this.orderExists(order_id)) {
            const error = new Error("Order does not exist");
            error.statusCode = 404;
            throw error;
        }

        try {
            let sql = `DELETE FROM \`order\` WHERE order_id = ?`;
            const result = await database.query(sql, [order_id]);
            const { affectedRows } = result;
            return { affectedRows,message: "Order deleted successfully" };
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async deleteAllOrders() {
        try {
            let sql = `DELETE FROM \`order\``;
            const result = await database.query(sql);
            const { affectedRows } = result;

            if (affectedRows === 0) {
                const error = new Error("No orders to delete");
                error.statusCode = 404;
                throw error;
            }

            return { affectedRows };
        } catch (e) {
            throw e;
        }
    }

    static async orderExists(order_id) {
        try {
            let sql = `SELECT * FROM \`order\` WHERE order_id = ?`;
            const rows = await database.query(sql, [order_id]);

            return rows && rows.length > 0;
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async getOrdersByUser(user_id) {
        try {
            const sql = `SELECT * FROM \`order\` WHERE user_id = ?`;
            const rows = await database.query(sql, [user_id]);
    
            if (!rows || rows.length === 0) {
                const error = new Error("No orders found for this user");
                error.statusCode = 404;
                throw error;
            }
    
            return rows.map(Order.fromRow);
        } catch (e) {
            throw new Error(e.sqlMessage || e.message);
        }
    }
    
    

    static async getOrdersByStatus(status) {
        try {
            let sql = `SELECT * FROM \`order\` WHERE order_status = ?`;
            const rows = await database.query(sql, [status]);
            
            if (!rows || rows.length === 0) {
                const error = new Error(`No ${status} orders found`);
                error.statusCode = 404;
                throw error;
            }
            
            return rows.map(Order.fromRow);
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async getOrdersByMachine(machine_id) {
        try {
            let sql = `SELECT * FROM \`order\` WHERE machine_id = ?`;
            const rows = await database.query(sql, [machine_id]);
            
            if (!rows || rows.length === 0) {
                const error = new Error("No orders found for this machine");
                error.statusCode = 404;
                throw error;
            }
            
            return rows.map(Order.fromRow);
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }
}

module.exports = OrderRepository;