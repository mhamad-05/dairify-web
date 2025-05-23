const Machine = require("../models/machineModel");
const MachineService = require("../services/machineService");

class MachineController {
    static async createMachine(req, res) {
        try {
            const { status,location, sample_id, last_maintenance_date } = req.body;
            console.log(status)
            const machine = new Machine(0, status,location, sample_id, last_maintenance_date);
            const result = await MachineService.createMachine(machine);
            res.status(201).json(result);
        } catch (e) {
            res.status(500).json({ message: 'Internal server error', error: e.message });
        }
    }

    static async getMachine(req, res) {
        try {
            const { machine_id } = req.params;
            const result = await MachineService.getMachine(machine_id);
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'Machine not found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async getAllMachines(req, res) {
        try {
            const result = await MachineService.getAllMachines();
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'No machines found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async updateMachine(req, res) {
        try {
            const { machine_id } = req.params;
            const updates = req.body;
            const result = await MachineService.updateMachine(machine_id, updates);
            res.status(204).json(result);
        } catch (e) {
            if (e.statusCode === 400) {
                res.status(e.statusCode).json({ message: 'No updates provided', error: e.message });
            } else if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'Machine not found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async deleteMachine(req, res) {
        try {
            const { machine_id } = req.params;
            const result = await MachineService.deleteMachine(machine_id);
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'Machine not found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async getActiveMachines(req, res) {
        try {
            const result = await MachineService.getActiveMachines();
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'No active machines found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }
}

module.exports = MachineController;