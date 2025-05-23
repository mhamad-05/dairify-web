const Antibiotic = require("../models/antibioticModel");
const database = require("../config/db");
require('dotenv').config();

class AntibioticRepository {

    static async createAntibiotic(antibiotic) {
        if (await this.antibioticExists(antibiotic.name)) {
            const error = new Error("Antibiotic already exists");
            error.statusCode = 409;
            throw error;
        }
        try {
            let sql = `INSERT INTO antibiotics 
            (name, maximum_safe_concentration)
            VALUES (?,?)`;
            const result = await database.query(sql, [antibiotic.name, antibiotic.maximum_safe_concentration]);
            const { affectedRows, insertId } = result;
            return {
                affectedRows,
                insertId: insertId.toString()
            };
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    
    static async getAntibiotic(name) {
        if (!await this.antibioticExists(name)) {
            const error = new Error("Antibiotic does not exist");
            error.statusCode = 404;
            throw error;
        }
        try {
            let sql = `SELECT * FROM antibiotics WHERE name = ?`;
            const [row] = await database.query(sql, [name]);
            return Antibiotic.fromRow(row);
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async getAntibioticByID(antibiotic_id) {
        if (!await this.antibioticExistsByID(antibiotic_id)) {
            const error = new Error("Antibiotic does not exist");
            error.statusCode = 404;
            throw error;
        }
        try {
            let sql = `SELECT * FROM antibiotics WHERE antibiotic_id = ?`;
            const [row] = await database.query(sql, [antibiotic_id]);
            return Antibiotic.fromRow(row);
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async getAllAntibiotics() {
        try {
            let sql = `SELECT * FROM antibiotics`;
            const row = await database.query(sql);
            if (!row || row.length === 0) {
                const error = new Error("No antibiotics exist");
                error.statusCode = 404;
                throw error;
            }
            return row.map(Antibiotic.fromRow);
        } catch (e) {
            throw e;
        }
    }

    static async updateAntibiotic(name, updates) {
        if (!await this.antibioticExists(name)) {
            const error = new Error("Antibiotic does not exist");
            error.statusCode = 404;
            throw error;
        }
        if (!updates || Object.keys(updates).length === 0) {
            const error = new Error("No updates provided");
            error.statusCode = 400;
            throw error;
        }
        if (updates.name && updates.name.toLowerCase() !== name.toLowerCase()) {
            if (await this.antibioticExists(updates.name)) {
                const error = new Error("The new antibiotic name already exists");
                error.statusCode = 409;
                throw error;
            }
        }

        try {
            let sql = "UPDATE antibiotics SET ";
            let conditions = [];
            let values = [];

            for (const key in updates) {
                conditions.push(`${key} = ?`);
                values.push(updates[key]);
            }

            sql += conditions.join(", ");
            sql += " WHERE name = ?";
            values.push(name);

            const result = await database.query(sql, values);
            const { affectedRows } = result;

            return { affectedRows };
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }



    static async deleteAntibiotic(name) {
        if (!await this.antibioticExists(name)) {
            const error = new Error("Antibiotic does not exist");
            error.statusCode = 404;
            throw error;
        }

        try {
            let sql = `DELETE FROM antibiotics WHERE name = ?`;
            const result = await database.query(sql, [name]);
            const { affectedRows } = result;
            return { affectedRows };
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async deleteAllAntibiotics() {
        try {
            let sql = `DELETE FROM antibiotics`;
            const result = await database.query(sql);
            const { affectedRows } = result;

            if (affectedRows === 0) {
                const error = new Error("No antibiotics to delete");
                error.statusCode = 404;
                throw error;
            }

            return { affectedRows };
        } catch (e) {
            throw e;
        }
    }

    static async antibioticExistsByID(antibiotic_id) {

        try {
            let sql = `SELECT * FROM antibiotics WHERE antibiotic_id = ?`;
            const rows = await database.query(sql, [antibiotic_id]);
            console.log(rows);

            if (rows && rows.length > 0) {
                return true;
            }

            return false;
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async antibioticExists(name) {
        try {
            let sql = `SELECT * FROM antibiotics WHERE name = ?`;
            const rows = await database.query(sql, [name]);

            if (rows && rows.length > 0) {
                return true;
            }

            return false;
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }
}

module.exports = AntibioticRepository;