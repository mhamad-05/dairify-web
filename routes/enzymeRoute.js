const express = require('express');
const EnzymeController = require('../controllers/enzymeController');
const { 
  validateEnzyme, 
  validateEnzymeIDParam, 
  validateEnzymeNameParam, 
  validateEnzymeUpdate 
} = require('../validators/enzymeDTO');

const router = express.Router();

router.post('/', EnzymeController.createEnzyme);
router.get('/name/:name', validateEnzymeNameParam, EnzymeController.getEnzyme);
router.get('/id/:enzyme_id', validateEnzymeIDParam, EnzymeController.getEnzymeByID);
router.get('/', EnzymeController.getAllEnzymes);
router.put('/:name', validateEnzymeUpdate, EnzymeController.updateEnzyme);
router.delete('/:name', validateEnzymeNameParam, EnzymeController.deleteEnzyme);
router.delete('/', EnzymeController.deleteAllEnzymes);

module.exports = router;