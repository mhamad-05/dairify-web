const ResearchData = require("../models/researchDataModel");
const database = require("../config/db");
require('dotenv').config();

class ResearchDataRepository {

    static async createResearchData(researchData) {
        try {
            let sql = `INSERT INTO researchdata 
            (findings, published_at, test_id)
            VALUES (?,?,?)`;
            const result = await database.query(sql, [
                researchData.findings,
                researchData.published_at,
                researchData.test_id
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

    static async getResearchData(research_id) {
        if (!await this.researchDataExists(research_id)) {
            const error = new Error("Research data does not exist");
            error.statusCode = 404;
            throw error;
        }
        try {
            let sql = `SELECT * FROM researchdata WHERE research_id = ?`;
            const [row] = await database.query(sql, [research_id]);
            return ResearchData.fromRow(row);
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async getAllResearchData() {
        try {
            let sql = `SELECT * FROM researchdata`;
            const row = await database.query(sql);
            if (!row || row.length === 0) {
                const error = new Error("No research data exists");
                error.statusCode = 404;
                throw error;
            }
            return row.map(ResearchData.fromRow);
        } catch (e) {
            throw e;
        }
    }

    static async updateResearchData(research_id, updates) {
        if (!await this.researchDataExists(research_id)) {
            const error = new Error("Research data does not exist");
            error.statusCode = 404;
            throw error;
        }
        if (!updates || Object.keys(updates).length === 0) {
            const error = new Error("No updates provided");
            error.statusCode = 400; 
            throw error;
        }

        try {
            let sql = "UPDATE researchdata SET ";
            let conditions = [];
            let values = [];

            for (const key in updates) {
                conditions.push(`${key} = ?`);
                values.push(updates[key]);
            }

            sql += conditions.join(", ");
            sql += " WHERE research_id = ?";
            values.push(research_id);

            const result = await database.query(sql, values);
            const { affectedRows } = result;

            return { affectedRows };
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async deleteResearchData(research_id) {
        if (!await this.researchDataExists(research_id)) {
            const error = new Error("Research data does not exist");
            error.statusCode = 404;
            throw error;
        }

        try {
            let sql = `DELETE FROM researchdata WHERE research_id = ?`;
            const result = await database.query(sql, [research_id]);
            const { affectedRows } = result;
            return { affectedRows };
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async deleteAllResearchData() {
        try {
            let sql = `DELETE FROM researchdata`;
            const result = await database.query(sql);
            const { affectedRows } = result;

            if (affectedRows === 0) {
                const error = new Error("No research data to delete");
                error.statusCode = 404;
                throw error;
            }

            return { affectedRows };
        } catch (e) {
            throw e;
        }
    }

    static async researchDataExists(research_id) {
        try {
            let sql = `SELECT * FROM researchdata WHERE research_id = ?`;
            const rows = await database.query(sql, [research_id]);

            if (rows && rows.length > 0) {
                return true;
            }

            return false;
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async getResearchByTest(test_id) {
        try {
            let sql = `SELECT * FROM researchdata WHERE test_id = ?`;
            const rows = await database.query(sql, [test_id]);
            
            if (!rows || rows.length === 0) {
                const error = new Error("No research data found for this test");
                error.statusCode = 404;
                throw error;
            }
            
            return rows.map(ResearchData.fromRow);
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

  
}

module.exports = ResearchDataRepository;