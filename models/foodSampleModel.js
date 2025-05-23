/**
 * Represents a food sample submitted for testing.
 */
class FoodSample {
    /**
     * Creates a new FoodSample instance.
     * @param {number} sample_id - Unique ID of the sample (0 if new)
     * @param {string} date_collected - ISO date string when sample was collected
     * @param {string} status - Status: 'L' (Liquid), 'S' (Solid)
     * @param {number} machine_id - Machine used for testing
     */
    constructor(sample_id, date_collected, status, machine_id) {
        this.sample_id = sample_id;
        this.date_collected = date_collected;
        this.status = status;
        this.machine_id = machine_id;
    }

    /**
     * Creates a FoodSample object from a database row.
     * @param {Object} row - Row from database query
     * @returns {FoodSample}
     */
    static fromRow(row) {
        return new FoodSample(
            row.sample_id,
            row.date_collected,
            row.status,
            row.machine_id
        );
    }
}

// Export the FoodSample class
module.exports = FoodSample;