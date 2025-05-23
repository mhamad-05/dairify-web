const OrderRepository = require("../repositories/ordersRepository");
const UserRepository = require("../repositories/userRepository");
const MachineRepository = require("../repositories/machineRepository");

class OrderService {
    static async createOrder(order) {
        console.log(order.user_id)
        const [userExists, machineExists] = await Promise.all([
            UserRepository.userExistsByID(order.user_id),
            MachineRepository.machineExists(order.machine_id)
        ]);
        if (!userExists) {
            const error = new Error("User does not exist");
            error.statusCode = 404;
            throw error;
        }
        if (!machineExists) {
            const error = new Error("Machine does not exist");
            error.statusCode = 404;
            throw error;
        }
        try {
            return OrderRepository.createOrder(order);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async getOrder(order_id) {
        try {
            return OrderRepository.getOrder(order_id);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async getAllOrders() {
        try {
            return OrderRepository.getAllOrders();
        } catch (e) {
            throw new Error(e.message);
        }
    }
    static async getOrdersByStatus(status){
    try {
        return OrderRepository.getOrdersByStatus(status)
        
    } catch (e) {
        throw new Error(e.message)
    }
}

    static async updateOrder(order_id, updates) {
        try {
            return OrderRepository.updateOrder(order_id, updates);
        } catch (e) {
            throw new Error(e.message);
        }
    }
    static async getOrdersByUser(user_id) {
        const userExists = await UserRepository.userExistsByID(user_id);
    
        if (!userExists) {
            const error = new Error("User does not exist");
            error.statusCode = 404;
            throw error;
        }
    
        try {
            return await OrderRepository.getOrdersByUser(user_id);
        } catch (e) {
            throw new Error(e.message);
        }
    }
    static async getOrdersByMachine(machine_id) {
        const machineExists = await MachineRepository.machineExists(machine_id);
    
        if (!machineExists) {
            const error = new Error("Machine does not exist");
            error.statusCode = 404;
            throw error;
        }
    
        try {
            return await OrderRepository.getOrdersByMachine(machine_id);
        } catch (e) {
            throw new Error(e.message);
        }
    }
    
    static async deleteOrder(order_id) {
        try {
            return OrderRepository.deleteOrder(order_id);
        } catch (e) {
            throw new Error(e.message);
        }
    }
}

module.exports = OrderService;