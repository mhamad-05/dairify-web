const EnzymeRepository = require("../repositories/enzymesRepository");
const TestResultRepository = require("../repositories/testResultsRepository");

class EnzymeService {
    static async createEnzyme(enzyme) {
        try {
            return await EnzymeRepository.createEnzyme(enzyme);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async getEnzyme(name) {
        try {
            return await EnzymeRepository.getEnzyme(name);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async getEnzymeByID(enzyme_id) {
        try {
            return await EnzymeRepository.getEnzymeByID(enzyme_id);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async getAllEnzymes() {
        try {
            return await EnzymeRepository.getAllEnzymes();
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async updateEnzyme(name, updates) {
        try {
            return await EnzymeRepository.updateEnzyme(name, updates);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async deleteEnzyme(name) {
        // // Check if enzyme is referenced in test results
        // const results = await TestResultRepository.getResultsByEnzyme(name);
        // if (results.length > 0) {
        //     const error = new Error("Cannot delete - enzyme has associated test results");
        //     error.statusCode = 400;
        //     throw error;
        // }

        try {
            return await EnzymeRepository.deleteEnzyme(name);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async deleteAllEnzymes() {
        try {
            return await EnzymeRepository.deleteAllEnzymes();
        } catch (e) {
            throw new Error(e.message);
        }
    }
}

module.exports = EnzymeService;