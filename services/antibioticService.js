const AntibioticRepository = require("../repositories/antiobioticRepository");
const TestResultRepository = require("../repositories/testResultsRepository");

class AntibioticService {
    static async createAntibiotic(antibiotic) {
        try {
            return await AntibioticRepository.createAntibiotic(antibiotic);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async getAntibiotic(name) {
        try {
            return await AntibioticRepository.getAntibiotic(name);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async getAntibioticByID(antibiotic_id) {
        try {
            return await AntibioticRepository.getAntibioticByID(antibiotic_id);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async getAllAntibiotics() {
        try {
            return await AntibioticRepository.getAllAntibiotics();
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async updateAntibiotic(name, updates) {
        try {
            return await AntibioticRepository.updateAntibiotic(name, updates);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async deleteAntibiotic(name) {
        // Check if antibiotic is referenced in test results
        //  const results = await TestResultRepository.getResultsByAntibiotic(name);
        //  if (results.length > 0) {
        //      const error = new Error("Cannot delete - antibiotic has associated test results");
        //      error.statusCode = 400;
        //      throw error;
        //  }

        try {
            return await AntibioticRepository.deleteAntibiotic(name);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async deleteAllAntibiotics() {
        try {
            return await AntibioticRepository.deleteAllAntibiotics();
        } catch (e) {
            throw new Error(e.message);
        }
    }
}

module.exports = AntibioticService;