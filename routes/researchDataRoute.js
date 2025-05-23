const express = require('express');
const ResearchDataController = require('../controllers/researchDataController');


const router = express.Router();

router.post('/', ResearchDataController.createResearchData);
router.get('/:research_id', ResearchDataController.getResearchData);
router.get('/', ResearchDataController.getAllResearchData);
router.put('/:research_id', ResearchDataController.updateResearchData);
router.delete('/:research_id', ResearchDataController.deleteResearchData);


module.exports = router;