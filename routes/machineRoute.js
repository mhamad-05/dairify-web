const express = require('express');
const MachineController = require('../controllers/machineController');
const { 
  validateMachine, 
  validateMachineIDParam, 
  validateMachineUpdate 
} = require('../validators/machineDTO');

const router = express.Router();

router.post('/',MachineController.createMachine);
router.get('/:machine_id', validateMachineIDParam, MachineController.getMachine);
router.get('/', MachineController.getAllMachines);
router.put('/:machine_id', validateMachineUpdate, MachineController.updateMachine);
router.delete('/:machine_id', validateMachineIDParam, MachineController.deleteMachine);
router.get('/active/machine', MachineController.getActiveMachines);

module.exports = router;