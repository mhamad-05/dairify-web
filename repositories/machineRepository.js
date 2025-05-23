const Machine = require("../models/machineModel");
const database = require("../config/db");
require('dotenv').config();

class MachineRepository {

    static async createMachine(machine) {
        try {
            console.log(machine)
            let sql = `INSERT INTO machine
            (location, status, sample_id, last_maintenance_date)
            VALUES (?,?,?,?)`;
            const result = await database.query(sql, [
                machine.location,
                machine.status, // Default to 'active'
                machine.sample_id,
                machine.last_maintenance_date

            ]);
            console.log(machine.last_maintenance_date)
            const { affectedRows, insertId } = result;
            return {
                affectedRows,
                insertId: insertId.toString()
            };
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async getMachine(machine_id) {
        if (!await this.machineExists(machine_id)) {
            const error = new Error("Machine does not exist");
            error.statusCode = 404;
            throw error;
        }
        try {
            let sql = `SELECT * FROM machine WHERE machine_id = ?`;
            const [row] = await database.query(sql, [machine_id]);
            return Machine.fromRow(row);
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async getAllMachines() {
        try {
            let sql = `SELECT * FROM machine`;
            const row = await database.query(sql);
            if (!row || row.length === 0) {
                const error = new Error("No machines exist");
                error.statusCode = 404;
                throw error;
            }
            return row.map(Machine.fromRow);
        } catch (e) {
            throw e;
        }
    }

    static async updateMachine(machine_id, updates) {
        if (!await this.machineExists(machine_id)) {
            const error = new Error("Machine does not exist");
            error.statusCode = 404;
            throw error;
        }
        if (!updates || Object.keys(updates).length === 0) {
            const error = new Error("No updates provided");
            error.statusCode = 400; 
            throw error;
        }

        try {
            let sql = "UPDATE machine SET ";
            let conditions = [];
            let values = [];

            for (const key in updates) {
                conditions.push(`${key} = ?`);
                values.push(updates[key]);
            }

            sql += conditions.join(", ");
            sql += " WHERE machine_id = ?";
            values.push(machine_id);

            const result = await database.query(sql, values);
            const { affectedRows } = result;

            return { affectedRows };
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async deleteMachine(machine_id) {
        if (!await this.machineExists(machine_id)) {
            const error = new Error("Machine does not exist");
            error.statusCode = 404;
            throw error;
        }

        try {
            let sql = `DELETE FROM machine WHERE machine_id = ?`;
            const result = await database.query(sql, [machine_id]);
            const { affectedRows } = result;
            return { affectedRows };
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async deleteAllMachines() {
        try {
            let sql = `DELETE FROM machine`;
            const result = await database.query(sql);
            const { affectedRows } = result;

            if (affectedRows === 0) {
                const error = new Error("No machines to delete");
                error.statusCode = 404;
                throw error;
            }

            return { affectedRows };
        } catch (e) {
            throw e;
        }
    }

    static async machineExists(machine_id) {
        try {
            let sql = `SELECT * FROM machine WHERE machine_id = ?`;
            const rows = await database.query(sql, [machine_id]);

            if (rows && rows.length > 0) {
                return true;
            }

            return false;
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async getActiveMachines() {
        try {
            let sql = `SELECT * FROM machine WHERE status = 'active'`;
            const rows = await database.query(sql);
            
            if (!rows || rows.length === 0) {
                const error = new Error("No active machines found");
                error.statusCode = 404;
                throw error;
            }
            
            return rows.map(Machine.fromRow);
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async getMachinesByLocation(location) {
        try {
            let sql = `SELECT * FROM machine WHERE location LIKE ?`;
            const rows = await database.query(sql, [`%${location}%`]);
            
            if (!rows || rows.length === 0) {
                const error = new Error("No machines found in this location");
                error.statusCode = 404;
                throw error;
            }
            
            return rows.map(Machine.fromRow);
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }
}

module.exports = MachineRepository;