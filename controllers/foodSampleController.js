const FoodSample = require("../models/foodSampleModel");
const FoodSampleService = require("../services/foodSampleService");

class FoodSampleController {
    static async createFoodSample(req, res) {
    try {
        const { date_collected, status, machine_id } = req.body;
        const foodSample = new FoodSample(0, date_collected, status, machine_id);
        await FoodSampleService.createFoodSample(foodSample);

       res.render('success', {
    title: 'Success',
    message: 'Your food sample was submitted successfully!',
    user: req.session.user
});

    } catch (e) {
        if (e.statusCode === 404 && e.message.includes('Machine')) {
            req.flash('error', 'The selected machine does not exist.');
        } else if (e.statusCode === 400) {
            req.flash('error', 'Invalid input. Please check the data and try again.');
        } else {
            req.flash('error', 'An error occurred while saving the sample.');
        }
        res.redirect('/food-samples');
    }
}

    static async getFoodSample(req, res) {
        try {
            const { sample_id } = req.params;
            const result = await FoodSampleService.getFoodSample(sample_id);
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'Food sample not found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async getAllFoodSamples(req, res) {
        try {
            const result = await FoodSampleService.getAllFoodSamples();
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'No food samples found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async updateFoodSample(req, res) {
        try {
            const { sample_id } = req.params;
            const updates = req.body;
            const result = await FoodSampleService.updateFoodSample(sample_id, updates);
            res.status(204).json(result);
        } catch (e) {
            if (e.statusCode === 400) {
                res.status(e.statusCode).json({ message: 'No updates provided', error: e.message });
            } else if (e.statusCode === 404) {
                const message = e.message.includes('Machine') 
                    ? 'Machine not found' 
                    : 'Food sample not found';
                res.status(e.statusCode).json({ message, error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async deleteFoodSample(req, res) {
        try {
            const { sample_id } = req.params;
            const result = await FoodSampleService.deleteFoodSample(sample_id);
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'Food sample not found', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }

    static async deleteAllFoodSamples(req, res) {
        try {
            const result = await FoodSampleService.deleteAllFoodSamples();
            res.status(200).json(result);
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(e.statusCode).json({ message: 'No food samples found to delete', error: e.message });
            } else {
                res.status(500).json({ message: 'Internal server error', error: e.message });
            }
        }
    }
}

module.exports = FoodSampleController;