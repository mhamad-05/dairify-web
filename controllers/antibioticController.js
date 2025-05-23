const Antibiotic = require("../models/antibioticModel");
const AntibioticService = require("../services/antibioticService");

class AntibioticController {
    static async createAntibiotic(req, res) {
    try {
        const { name, maximum_safe_concentration } = req.body;
        const antibiotic = new Antibiotic(0, name, maximum_safe_concentration);
        await AntibioticService.createAntibiotic(antibiotic);

        // ✅ Set success message and redirect
        req.flash('success', 'Antibiotic added successfully!');
        res.redirect('/dashboard');

    } catch (e) {
        if (e.statusCode === 409) {
            req.flash('error', 'Antibiotic already exists.');
            res.redirect('/add-antibiotic');
        } else {
            req.flash('error', e.message || 'An error occurred while adding the antibiotic.');
            res.redirect('/add-antibiotic');
        }
    }
}

    static async getAntibiotic(req, res) {
        try {
            const { name } = req.params;
            const result = await AntibioticService.getAntibiotic(name);
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'Antibiotic not found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async getAntibioticByID(req, res) {
        try {
            const { antibiotic_id } = req.params;
            const result = await AntibioticService.getAntibioticByID(antibiotic_id);
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'Antibiotic not found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async getAllAntibiotics(req, res) {
        try {
            const result = await AntibioticService.getAllAntibiotics();
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'No antibiotics found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async updateAntibiotic(req, res) {
        try {
            const { name } = req.params;
            const updates = req.body;
            const result = await AntibioticService.updateAntibiotic(name, updates);
            res.status(204).json(result);
        } catch (e) {
            if (e.statusCode === 400) {
                res.status(e.statusCode).json({ message: 'No updates provided', error: e.message });
            } else if (e.statusCode === 409) {
                res.status(e.statusCode).json({ message: 'Antibiotic name already exists', error: e.message });
            } else if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'Antibiotic not found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async deleteAntibiotic(req, res) {
        try {
            const { name } = req.params;

            const result = await AntibioticService.deleteAntibiotic(name);
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'Antibiotic not found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async deleteAllAntibiotics(req, res) {
        try {
            const result = await AntibioticService.deleteAllAntibiotics();
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'No antibiotics found to delete', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }
}

module.exports = AntibioticController;