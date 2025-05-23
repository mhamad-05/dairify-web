/**
 * Represents an Order placed by a user for a machine.
 */
class Order {
    /**
     * Creates a new Order instance.
     * @param {number} order_id - Unique ID of the order (0 if new)
     * @param {number} user_id - ID of the user placing the order
     * @param {number} machine_id - ID of the machine being ordered
     * @param {string} order_date - Date the order was placed
     * @param {string} order_status - Status: Pending / Shipped / Delivered
     */
    constructor(order_id, user_id, machine_id, order_date, order_status) {
        this.order_id = order_id;
        this.user_id = user_id;
        this.machine_id = machine_id;
        this.order_date = order_date;
        this.order_status = order_status;
    }

    /**
     * Creates an Order object from a database row.
     * @param {Object} row - Database row
     * @returns {Order}
     */
    static fromRow(row) {
        return new Order(
            row.order_id,
            row.user_id,
            row.machine_id,
            row.order_date,
            row.order_status
        );
    }
}

// Export the Order class
module.exports = Order;