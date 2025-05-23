const ResearchData = require("../models/researchDataModel");
const ResearchDataService = require("../services/researchDataService");

class ResearchDataController {
    static async createResearchData(req, res) {
        try {
            const { findings, published_at, test_id } = req.body;
            const researchData = new ResearchData(0, findings, published_at, test_id);
            const result = await ResearchDataService.createResearchData(researchData);
            res.status(201).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'Test result not found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async getResearchData(req, res) {
        try {
            const { research_id } = req.params;
            const result = await ResearchDataService.getResearchData(research_id);
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'Research data not found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async getAllResearchData(req, res) {
        try {
            const result = await ResearchDataService.getAllResearchData();
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'No research data found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async updateResearchData(req, res) {
        try {
            const { research_id } = req.params;
            const updates = req.body;
            const result = await ResearchDataService.updateResearchData(research_id, updates);
            res.status(204).json(result);
        } catch (e) {
            if (e.statusCode === 400) {
                res.status(e.statusCode).json({ message: 'No updates provided', error: e.message });
            } else if (e.statusCode === 404) {
                const message = e.message.includes('Test') ? 'Test result not found' : 'Research data not found';
                res.status(e.statusCode).json({ message, error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async deleteResearchData(req, res) {
        try {
            const { research_id } = req.params;
            const result = await ResearchDataService.deleteResearchData(research_id);
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'Research data not found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async getRecentResearch(req, res) {
        try {
            const { limit } = req.query;
            const result = await ResearchDataService.getRecentResearch(limit || 10);
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'No research data found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }
}

module.exports = ResearchDataController;