const TestResultRepository = require("../repositories/testResultsRepository");
const FoodSampleRepository = require("../repositories/foodSamplesRepository");
const AntibioticRepository = require("../repositories/antiobioticRepository");
const EnzymeRepository = require("../repositories/enzymesRepository");

class TestResultService {
    static async createTestResult(testResult) {
        console.log(testResult.antibiotic_id);
        const validations = [
            FoodSampleRepository.foodSampleExists(testResult.sample_id),
            AntibioticRepository.antibioticExistsByID(testResult.antibiotic_id),
            EnzymeRepository.enzymeExistsByID(testResult.enzyme_id)
        ];
        
        const [sampleExists, antibioticExists, enzymeExists] = await Promise.all(validations);
        
        if (!sampleExists) {
            const error = new Error("Food sample does not exist");
            error.statusCode = 404;
            throw error;
        }
        if (!antibioticExists) {
            const error = new Error("Antibiotic does not exist");
            error.statusCode = 404;
            throw error;
        }

        if (!enzymeExists) {
            const error = new Error("Enzyme does not exist");
            error.statusCode = 404;
            throw error;
            

        }
        
        try {
            return TestResultRepository.createTestResult(testResult);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async getTestResult(test_id) {
        try {
            return TestResultRepository.getTestResult(test_id);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async getAllTestResults() {
        try {
            return TestResultRepository.getAllTestResults();
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async updateTestResult(test_id, updates) {
        try {
            return TestResultRepository.updateTestResult(test_id, updates);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async deleteTestResult(test_id) {
        try {
            return TestResultRepository.deleteTestResult(test_id);
        } catch (e) {
            throw new Error(e.message);
        }
    }
    static async getResultsByStatus(status) {
      
        try {
            return TestResultRepository.getResultsByStatus(status);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async getAllTestResultsWithDetails() {
    try {
        return await TestResultRepository.getAllTestResultsWithDetails();
    } catch (e) {
        throw new Error(e.message);
    }
}
}

module.exports = TestResultService;