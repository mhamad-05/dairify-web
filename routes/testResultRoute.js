const express = require('express');
const TestResultController = require('../controllers/testResultController');
const { 
  validateTestResult, 
  validateTestIDParam, 
  validateTestResultUpdate 
} = require('../validators/testResultDTO');

const router = express.Router();

router.post('/', validateTestResult,TestResultController.createTestResult);
router.get('/:test_id', validateTestIDParam, TestResultController.getTestResult);
router.get('/', TestResultController.getAllTestResults);
router.get('/', TestResultController.getTestResultsPage);
router.put('/:test_id', validateTestResultUpdate, TestResultController.updateTestResult);
router.delete('/:test_id', validateTestIDParam, TestResultController.deleteTestResult);
router.get('/get/status', TestResultController.getResultsByStatus);

module.exports = router;