const TestResult = require("../models/testResultModel");
const researchRepository = require("../repositories/researchDataRepository");
const database = require("../config/db");
require('dotenv').config();

class TestResultRepository {

    static async createTestResult(testResult) {
        try {
            console.log("Creating test result:", testResult);
            let sql = `INSERT INTO testresults 
            (sample_id, result_status, antibiotic_id, enzyme_id)
            VALUES (?,?,?,?)`;
            const result = await database.query(sql, [
                testResult.sample_id,
                testResult.result_status,
                testResult.antibiotic_id,
                testResult.enzyme_id,
                
            ]);
            console.log("Result of test result creation:", result); 
            const { affectedRows, insertId } = result;
            return {
                affectedRows,
                insertId: insertId.toString()
            };
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async getTestResult(test_id) {
        if (!await this.testResultExists(test_id)) {
            const error = new Error("Test result does not exist");
            error.statusCode = 404;
            throw error;
        }
        try {
            let sql = `SELECT * FROM testresults WHERE test_id = ?`;
            const [row] = await database.query(sql, [test_id]);
            return TestResult.fromRow(row);
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async getAllTestResults() {
        try {
            let sql = `SELECT * FROM testresults`;
            const row = await database.query(sql);
            if (!row || row.length === 0) {
                const error = new Error("No test results exist");
                error.statusCode = 404;
                throw error;
            }
            return row.map(TestResult.fromRow);
        } catch (e) {
            throw e;
        }
    }

    static async updateTestResult(test_id, updates) {
        if (!await this.testResultExists(test_id)) {
            const error = new Error("Test result does not exist");
            error.statusCode = 404;
            throw error;
        }
        if (!updates || Object.keys(updates).length === 0) {
            const error = new Error("No updates provided");
            error.statusCode = 400; 
            throw error;
        }

        try {
            let sql = "UPDATE testresults SET ";
            let conditions = [];
            let values = [];

            for (const key in updates) {
                conditions.push(`${key} = ?`);
                values.push(updates[key]);
            }

            sql += conditions.join(", ");
            sql += " WHERE test_id = ?";
            values.push(test_id);

            const result = await database.query(sql, values);
            const { affectedRows } = result;

            return { affectedRows };
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async deleteTestResult(test_id) {
        if (!await this.testResultExists(test_id)) {
            const error = new Error("Test result does not exist");
            error.statusCode = 404;
            throw error;
        }

        try {
            const researchData = await researchRepository.getResearchByTest(test_id);
            await researchRepository.deleteAllResearchData(researchData.research_id);

            let sql = `DELETE FROM testresults WHERE test_id = ?`;
            const result = await database.query(sql, [test_id]);
            const { affectedRows } = result;
            return { affectedRows };
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async deleteAllTestResults() {
        try {
            let sql = `DELETE FROM testresults`;
            const result = await database.query(sql);
            const { affectedRows } = result;

            if (affectedRows === 0) {
                const error = new Error("No test results to delete");
                error.statusCode = 404;
                throw error;
            }

            return { affectedRows };
        } catch (e) {
            throw e;
        }
    }

    static async testResultExists(test_id) {
        try {
            let sql = `SELECT * FROM testresults WHERE test_id = ?`;
            const rows = await database.query(sql, [test_id]);

            if (rows && rows.length > 0) {
                return true;
            }

            return false;
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async getResultsByStatus(result_status) {
        try {
            let sql = `SELECT * FROM testresults WHERE result_status = ?`;
            const rows = await database.query(sql, [result_status]);
            
            if (!rows || rows.length === 0) {

                const error = new Error(`No test results found`);
                error.statusCode = 404;
                error.errorParam = result_status;
                throw error;
            }
            
            return rows.map(TestResult.fromRow);
        } catch (e) {
            throw e;
        }
    }

    static async getAllTestResultsWithDetails() {
    try {
        let sql = `
        SELECT 
          tr.test_id,
          tr.sample_id,
          tr.result_status,
          a.name AS antibioticName,
          e.name AS enzymeName,
          fs.date_collected,
          fs.machine_id
        FROM testresults tr
        LEFT JOIN antibiotics a ON tr.antibiotic_id = a.antibiotic_id
        LEFT JOIN enzymes e ON tr.enzyme_id = e.enzyme_id
        LEFT JOIN foodsamples fs ON tr.sample_id = fs.sample_id
        ORDER BY fs.date_collected DESC
        LIMIT 50`;

        const rows = await database.query(sql);
        if (!rows || rows.length === 0) {
            const error = new Error("No test results found");
            error.statusCode = 404;
            throw error;
        }
        return rows.map(row => ({
            test_id: row.test_id,
            sample_id: row.sample_id,
            result_status: row.result_status,
            antibioticName: row.antibioticName,
            enzymeName: row.enzymeName,
            date_collected: row.date_collected,
            machine_id: row.machine_id
        }));
    } catch (e) {
        throw e;
    }
}

    static async getResultsBySample(sample_id) {
        try {
            let sql = `SELECT * FROM testresults WHERE sample_id = ?`;
            const rows = await database.query(sql, [sample_id]);
            
            if (!rows || rows.length === 0) {
                const error = new Error("No test results found for this sample");
                error.statusCode = 404;
                throw error;
            }
            
            return rows.map(TestResult.fromRow);
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async getResultsByAntibiotic(antibiotic_id) {
        try {
            let sql = `SELECT * FROM testresults WHERE antibiotic_id = ?`;
            const rows = await database.query(sql, [antibiotic_id]);
            
            if (!rows || rows.length === 0) {
                const error = new Error("No test results found for this antibiotic");
                error.statusCode = 404;
                throw error;
            }
            
            return rows.map(TestResult.fromRow);
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }
}

module.exports = TestResultRepository;