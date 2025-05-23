const ResearchDataRepository = require("../repositories/researchDataRepository");
const TestResultRepository = require("../repositories/testResultsRepository");

class ResearchDataService {
    static async createResearchData(researchData) {
        // Check if test exists
        const testExists = await TestResultRepository.testResultExists(researchData.test_id);
        if (!testExists) {
            const error = new Error("Test result does not exist");
            error.statusCode = 404;
            throw error;
        }
        try {
            return ResearchDataRepository.createResearchData(researchData);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async getResearchData(research_id) {
        try {
            return ResearchDataRepository.getResearchData(research_id);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async getAllResearchData() {
        try {
            return ResearchDataRepository.getAllResearchData();
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async updateResearchData(research_id, updates) {
        // Check if test exists when updating
        if (updates.test_id) {
            const testExists = await TestResultRepository.testResultExists(updates.test_id);
            if (!testExists) {
                const error = new Error("Test result does not exist");
                error.statusCode = 404;
                throw error;
            }
        }
        try {
            return ResearchDataRepository.updateResearchData(research_id, updates);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async deleteResearchData(research_id) {
        try {
            return ResearchDataRepository.deleteResearchData(research_id);
        } catch (e) {
            throw new Error(e.message);
        }
    }
}

module.exports = ResearchDataService;