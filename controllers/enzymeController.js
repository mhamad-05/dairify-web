const Enzyme = require("../models/enzymeModel");
const EnzymeService = require("../services/enzymeService");

class EnzymeController {
    static async createEnzyme(req, res) {
        try {
            const { name, target_antibiotic, effectiveness_level, test_id } = req.body;
            const enzyme = new Enzyme(0, name, target_antibiotic, effectiveness_level, test_id || null);
            await EnzymeService.createEnzyme(enzyme);

            // ✅ Set flash message and redirect
            req.flash('success', 'Enzyme added successfully!');
            res.redirect('/dashboard');

        } catch (e) {
            if (e.statusCode === 409) {
                req.flash('error', 'Enzyme already exists.');
                res.redirect('/add-enzyme');
            } else {
                req.flash('error', e.message || 'An error occurred while adding the enzyme.');
                res.redirect('/add-enzyme');
            }
        }
    }

    static async getEnzyme(req, res) {
        try {
            const { name } = req.params;
            const result = await EnzymeService.getEnzyme(name);
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'Enzyme not found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async getEnzymeByID(req, res) {
        try {
            const { enzyme_id } = req.params;
            const result = await EnzymeService.getEnzymeByID(enzyme_id);
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'Enzyme not found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async getAllEnzymes(req, res) {
        try {
            const result = await EnzymeService.getAllEnzymes();
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'No enzymes found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async updateEnzyme(req, res) {
        try {
            const { name } = req.params;
            const updates = req.body;
            const result = await EnzymeService.updateEnzyme(name, updates);
            res.status(204).json(result);
        } catch (e) {
            if (e.statusCode === 400) {
                res.status(e.statusCode).json({ message: 'No updates provided', error: e.message });
            } else if (e.statusCode === 409) {
                res.status(e.statusCode).json({ message: 'Enzyme name already exists', error: e.message });
            } else if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'Enzyme not found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async deleteEnzyme(req, res) {
        try {
            const { name } = req.params;
            const result = await EnzymeService.deleteEnzyme(name);
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'Enzyme not found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async deleteAllEnzymes(req, res) {
        try {
            const result = await EnzymeService.deleteAllEnzymes();
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'No enzymes found to delete', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }
}

module.exports = EnzymeController;