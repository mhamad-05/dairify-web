const FoodSample = require("../models/foodSampleModel");
const database = require("../config/db");
require('dotenv').config();

class FoodSampleRepository {

    static async createFoodSample(foodSample) {
        try {
            let sql = `INSERT INTO foodsamples 
            (status, date_collected, machine_id)
            VALUES (?,?,?)`;
            const result = await database.query(sql, [
                foodSample.status,
                foodSample.date_collected,
                foodSample.machine_id
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

    static async getFoodSample(sample_id) {
        if (!await this.foodSampleExists(sample_id)) {
            const error = new Error("Food sample does not exist");
            error.statusCode = 404;
            throw error;
        }
        try {
            let sql = `SELECT * FROM foodsamples WHERE sample_id = ?`;
            const [row] = await database.query(sql, [sample_id]);
            return FoodSample.fromRow(row);
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async getAllFoodSamples() {
        try {
            let sql = `SELECT * FROM foodsamples`;
            const row = await database.query(sql);
            if (!row || row.length === 0) {
                const error = new Error("No food samples exist");
                error.statusCode = 404;
                throw error;
            }
            return row.map(FoodSample.fromRow);
        } catch (e) {
            throw e;
        }
    }

    static async updateFoodSample(sample_id, updates) {
        if (!await this.foodSampleExists(sample_id)) {
            const error = new Error("Food sample does not exist");
            error.statusCode = 404;
            throw error;
        }
        if (!updates || Object.keys(updates).length === 0) {
            const error = new Error("No updates provided");
            error.statusCode = 400; 
            throw error;
        }

        try {
            let sql = "UPDATE foodsamples SET ";
            let conditions = [];
            let values = [];

            for (const key in updates) {
                conditions.push(`${key} = ?`);
                values.push(updates[key]);
            }

            sql += conditions.join(", ");
            sql += " WHERE sample_id = ?";
            values.push(sample_id);

            const result = await database.query(sql, values);
            const { affectedRows } = result;

            return { affectedRows };
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async deleteFoodSample(sample_id) {
        if (!await this.foodSampleExists(sample_id)) {
            const error = new Error("Food sample does not exist");
            error.statusCode = 404;
            throw error;
        }

        try {
            let sql = `DELETE FROM foodsamples WHERE sample_id = ?`;
            const result = await database.query(sql, [sample_id]);
            const { affectedRows } = result;
            return { affectedRows };
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async deleteAllFoodSamples() {
        try {
            let sql = `DELETE FROM foodsamples`;
            const result = await database.query(sql);
            const { affectedRows } = result;

            if (affectedRows === 0) {
                const error = new Error("No food samples to delete");
                error.statusCode = 404;
                throw error;
            }

            return { affectedRows };
        } catch (e) {
            throw e;
        }
    }

    static async foodSampleExists(sample_id) {
        try {
            let sql = `SELECT * FROM foodsamples WHERE sample_id = ?`;
            const rows = await database.query(sql, [sample_id]);

            if (rows && rows.length > 0) {
                return true;
            }

            return false;
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }
     static async getFoodSampleByDate(date_collected){
        try {
            let sql = `SELECT * FROM foodsamples WHERE date_collected =?`;
            const rows = await database.query(sql,[date_collected]);

            if(!rows || rows.length === 0){
                const error = new Error("No food samples collected at this day");
                error.statusCode = 404;
                throw error;
            }
            
        } catch (error) {
            
        }
     }
    static async getSamplesByMachine(machine_id) {
        try {
            let sql = `SELECT * FROM foodsamples WHERE machine_id = ?`;
            const rows = await database.query(sql, [machine_id]);
            
            if (!rows || rows.length === 0) {
                const error = new Error("No samples found for this machine");
                error.statusCode = 404;
                throw error;
            }
            
            return rows.map(FoodSample.fromRow);
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }
}

module.exports = FoodSampleRepository;