/**
 * Service class for handling machine-related business logic.
 */
class MachineService {
    /**
     * Creates a new machine.
     * @param {Object} machine - Machine object with location, status, etc.
     * @returns {Promise<Object>} Database query result
     * @throws {Error} If creation fails
     */
    static async createMachine(machine) {
        try {
            return await MachineRepository.createMachine(machine);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    /**
     * Fetches a machine by ID.
     * @param {number} machine_id - ID of the machine
     * @returns {Promise<Machine|null>} Found machine or null
     * @throws {Error} If query fails
     */
    static async getMachine(machine_id) {
        try {
            return await MachineRepository.getMachine(machine_id);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    /**
     * Fetches all machines from the database.
     * @returns {Promise<Array<Machine>>} List of machines
     * @throws {Error} If DB error occurs
     */
    static async getAllMachines() {
        try {
            return await MachineRepository.getAllMachines();
        } catch (e) {
            throw new Error(e.message);
        }
    }

    /**
     * Updates an existing machine by ID.
     * @param {number} machine_id - ID of the machine
     * @param {Object} updates - Fields to update
     * @returns {Promise<Object>} Database query result
     * @throws {Error} If DB error occurs
     */
    static async updateMachine(machine_id, updates) {
        try {
            return await MachineRepository.updateMachine(machine_id, updates);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    /**
     * Deletes a machine by ID.
     * @param {number} machine_id - ID of the machine
     * @returns {Promise<{affectedRows: number}>} Number of deleted rows
     * @throws {Error} If deletion fails
     */
    static async deleteMachine(machine_id) {
        try {
            return await MachineRepository.deleteMachine(machine_id);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    /**
     * Gets all active machines.
     * @returns {Promise<Array<Machine>>} List of active machines
     * @throws {Error} If query fails
     */
    static async getActiveMachines() {
        try {
            return await MachineRepository.getActiveMachines();
        } catch (e) {
            throw new Error(e.message);
        }
    }
}

module.exports = MachineService;