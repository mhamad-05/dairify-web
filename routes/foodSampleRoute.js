const express = require('express');
const FoodSampleController = require('../controllers/foodSampleController');
const { 
  validateFoodSample, 
  validateSampleIDParam, 
  validateFoodSampleUpdate 
} = require('../validators/foodSampleDTO');

const router = express.Router();

router.post('/', validateFoodSample, FoodSampleController.createFoodSample);
router.get('/:sample_id', validateSampleIDParam, FoodSampleController.getFoodSample);
router.get('/', FoodSampleController.getAllFoodSamples);
router.put('/:sample_id', validateFoodSampleUpdate, FoodSampleController.updateFoodSample);
router.delete('/:sample_id', validateSampleIDParam, FoodSampleController.deleteFoodSample);
router.delete('/', FoodSampleController.deleteAllFoodSamples);

module.exports = router;