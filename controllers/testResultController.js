const TestResult = require("../models/testResultModel");
const TestResultService = require("../services/testResultService");


class TestResultController {
    static async createTestResult(req, res) {

        try {
            const { sample_id, result_status, antibiotic_id, enzyme_id } = req.body;


            const testResult = new TestResult(0, sample_id, result_status, antibiotic_id, enzyme_id);
            const result = await TestResultService.createTestResult(testResult);
            console.log("enzyme_id")
            res.status(201).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                const message = e.message.includes('Food sample') ? 'Food sample not found' :
                    e.message.includes('Antibiotic') ? 'Antibiotic not found' :
                        'Enzyme not found';
                res.status(e.statusCode).json({ message, error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async getTestResult(req, res) {
        try {
            const { test_id } = req.params;
            const result = await TestResultService.getTestResult(test_id);
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'Test result not found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async getAllTestResults(req, res) {
        try {
            const results = await TestResultService.getAllTestResultsWithDetails();
            res.render('test-results', { testResults: results });
        } catch (e) {
            if (e.statusCode === 404) {
                req.flash('error', 'No test results found.');
                res.redirect('/dashboard');
            } else {
                req.flash('error', 'Internal server error: ' + e.message);
                res.redirect('/dashboard');
            }
        }
    }

    static async updateTestResult(req, res) {
        try {
            const { test_id } = req.params;
            const updates = req.body;
            const result = await TestResultService.updateTestResult(test_id, updates);
            res.status(204).json(result);
        } catch (e) {
            if (e.statusCode === 400) {
                res.status(e.statusCode).json({ message: 'No updates provided', error: e.message });
            } else if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'Test result not found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async deleteTestResult(req, res) {
        try {
            const { test_id } = req.params;
            const result = await TestResultService.deleteTestResult(test_id);
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'Test result not found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async getResultsByStatus(req, res) {


        try {
            const { result_status } = req.query;
            res.status(200).json(result);
        } catch (e) {
            console.log(e.errorParam);
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: `No ${e.errorParam} test results found`, error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async getTestResultsPage(req, res) {
        try {
            const results = await TestResultService.getAllTestResultsWithDetails();
            res.render('test-results', { testResults: results });
        } catch (e) {
            req.flash('error', e.message || 'Failed to load test results.');
            res.redirect('/dashboard');
        }
    }
}

module.exports = TestResultController;