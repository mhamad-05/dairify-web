const FoodSampleRepository = require("../repositories/foodSamplesRepository");
const MachineRepository = require("../repositories/machineRepository");

class FoodSampleService {
    static async createFoodSample(foodSample) {
         const machineExists = await MachineRepository.machineExists(foodSample.machine_id);
         if (!machineExists) {
             const error = new Error("Machine does not exist");
             error.statusCode = 404;
             throw error;
         }
        try {
            return FoodSampleRepository.createFoodSample(foodSample); 
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async getFoodSample(sample_id) {
        try {
            return FoodSampleRepository.getFoodSample(sample_id);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async getAllFoodSamples() {
        try {
            return FoodSampleRepository.getAllFoodSamples();
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async updateFoodSample(sample_id, updates) {
        if (updates.machine_id) {
            const machineExists = await MachineRepository.machineExists(updates.machine_id);
            if (!machineExists) {
                const error = new Error("Machine does not exist");
                error.statusCode = 404;
                throw error;
            }
        }
        try {
            return FoodSampleRepository.updateFoodSample(sample_id, updates);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    static async deleteFoodSample(sample_id) {
        try {
            return FoodSampleRepository.deleteFoodSample(sample_id);
        } catch (e) {
            throw new Error(e.message);
        }
    }
    
    static async deleteAllFoodSamples(){
        try {
            return FoodSampleRepository.deleteAllFoodSamples();
        } catch (e) {
            throw new Error(e.message);
        }
    }
}

module.exports = FoodSampleService;
