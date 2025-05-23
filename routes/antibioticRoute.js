const express = require('express');
const AntibioticController = require('../controllers/antibioticController');
const { 
  validateAntibiotic, 
  validateAntibioticIDParam, 
  validateAntibioticNameParam, 
  validateAntibioticUpdate 
} = require('../validators/antibioticDTO');

const router = express.Router();

router.post('/', validateAntibiotic, AntibioticController.createAntibiotic);
router.get('/name/:name', validateAntibioticNameParam, AntibioticController.getAntibiotic);
router.get('/id/:antibiotic_id', validateAntibioticIDParam, AntibioticController.getAntibioticByID);
router.get('/', AntibioticController.getAllAntibiotics);
router.put('/:name', validateAntibioticUpdate, AntibioticController.updateAntibiotic);
router.delete('/:name', validateAntibioticNameParam, AntibioticController.deleteAntibiotic);
router.delete('/', AntibioticController.deleteAllAntibiotics);

module.exports = router;