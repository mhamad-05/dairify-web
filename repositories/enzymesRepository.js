const Enzyme = require("../models/enzymeModel");
const database = require("../config/db");
require('dotenv').config();

class EnzymeRepository {

    static async createEnzyme(enzyme) {
        if (await this.enzymeExists(enzyme.name)) {
            const error = new Error("Enzyme already exists");
            error.statusCode = 409;
            throw error;
        }
        try {
            let sql = `INSERT INTO enzymes 
            (name, target_antibiotic, effectiveness_level, test_id)
            VALUES (?,?,?,?)`;
            const result = await database.query(sql, [
                enzyme.name,
                enzyme.target_antibiotic,
                enzyme.effectiveness_level,
                enzyme.test_id || null
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

    static async getEnzyme(name) {
        if (!await this.enzymeExists(name)) {
            const error = new Error("Enzyme does not exist");
            error.statusCode = 404;
            throw error;
        }
        try {
            let sql = `SELECT * FROM enzymes WHERE name = ?`;
            const [row] = await database.query(sql, [name]);
            return Enzyme.fromRow(row);
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async getEnzymeByID(enzyme_id) {
        if (!await this.enzymeExistsByID(enzyme_id)) {
            const error = new Error("Enzyme does not exist");
            error.statusCode = 404;
            throw error;
        }
        try {
            let sql = `SELECT * FROM enzymes WHERE enzyme_id = ?`;
            const [row] = await database.query(sql, [enzyme_id]);
            return Enzyme.fromRow(row);
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async getAllEnzymes() {
        try {
            let sql = `SELECT * FROM enzymes`;
            const row = await database.query(sql);
            if (!row || row.length === 0) {
                const error = new Error("No enzymes exist");
                error.statusCode = 404;
                throw error;
            }
            return row.map(Enzyme.fromRow);
        } catch (e) {
            throw e;
        }
    }

    static async updateEnzyme(name, updates) {
        if (!await this.enzymeExists(name)) {
            const error = new Error("Enzyme does not exist");
            error.statusCode = 404;
            throw error;
        }
        if (!updates || Object.keys(updates).length === 0) {
            const error = new Error("No updates provided");
            error.statusCode = 400; 
            throw error;
        }
        if (updates.name && updates.name.toLowerCase() !== name.toLowerCase()) {
            if (await this.enzymeExists(updates.name)) {
                const error = new Error("The new enzyme name already exists");
                error.statusCode = 409;
                throw error;
            }
        }

        try {
            let sql = "UPDATE enzymes SET ";
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

    static async deleteEnzyme(name) {
        if (!await this.enzymeExists(name)) {
            const error = new Error("Enzyme does not exist");
            error.statusCode = 404;
            throw error;
        }

        try {
            let sql = `DELETE FROM enzymes WHERE name = ?`;
            const result = await database.query(sql, [name]);
            const { affectedRows } = result;
            return { affectedRows };
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async deleteAllEnzymes() {
        try {
            let sql = `DELETE FROM enzymes`;
            const result = await database.query(sql);
            const { affectedRows } = result;

            if (affectedRows === 0) {
                const error = new Error("No enzymes to delete");
                error.statusCode = 404;
                throw error;
            }

            return { affectedRows };
        } catch (e) {
            throw e;
        }
    }

    static async enzymeExistsByID(enzyme_id) {
        try {
            let sql = `SELECT * FROM enzymes WHERE enzyme_id = ?`;
            const rows = await database.query(sql, [enzyme_id]);

            if (rows && rows.length > 0) {
                return true;
            }

            return false;
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async enzymeExists(name) {
        try {
            let sql = `SELECT * FROM enzymes WHERE name = ?`;
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

module.exports = EnzymeRepository;