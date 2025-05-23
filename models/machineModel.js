/**
 * Represents a Dairify machine used for testing samples.
 */
class Machine {
    /**
     * Creates a new Machine instance.
     * @param {number} machine_id - Unique ID of the machine
     * @param {string} status - Current status (Active/Inactive)
     * @param {string} location - Physical location of the machine
     * @param {number} sample_id - Last sample ID processed
     * @param {string} last_maintenance_date - Date of last maintenance
     */
    constructor(machine_id, status, location, sample_id, last_maintenance_date) {
        this.machine_id = machine_id;
        this.status = status;
        this.location = location;
        this.sample_id = sample_id;
        this.last_maintenance_date = last_maintenance_date;
    }

    /**
     * Creates a Machine object from a database row.
     * @param {Object} row - Database row
     * @returns {Machine}
     */
    static fromRow(row) {
        return new Machine(
            row.machine_id,
            row.status,
            row.location,
            row.sample_id,
            row.last_maintenance_date
        );
    }
}

// Export the Machine class
module.exports = Machine;