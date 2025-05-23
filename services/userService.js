const UserRepository = require("../repositories/userRepository");
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const saltRounds = 10; // For password hashing

class UserService {
    static async createUser(userData) {
        try {
            // Hash password before saving
            const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
            const user = new User(
                0, // user_id (auto-incremented)
                userData.first_name,
                userData.second_name,
                userData.email,
                hashedPassword, // Use hashed password
                new Date() // created_at
            );
            return await UserRepository.createUser(user);
        } catch (e) {
            throw e; // Propagate repository errors (e.g., email conflict)
        }
    }

    static async getUserByEmail(email) {
        try {
            return await UserRepository.getUserByEmail(email);
        } catch (e) {
            throw e;
        }
    }

    static async getUserByID(user_id) {
        try {
            return await UserRepository.getUserByID(user_id);
        } catch (e) {
            throw e;
        }
    }

    static async getAllUsers() {
        try {
            return await UserRepository.getAllUsers();
        } catch (e) {
            throw e;
        }
    }

    static async updateUser(user_id, updates) { 
        try {
            // Hash new password if it's being updated
            if (updates.password) {
                updates.password = await bcrypt.hash(updates.password, saltRounds);
            }
            return await UserRepository.updateUser(user_id, updates);
        } catch (e) {
            throw e;
        }
    }

    static async deleteUser(user_id) {
        try {
            const result = await UserRepository.deleteUser(user_id);
    
            // Extra safety check (optional)
            if (!result || result.affectedRows === 0) {
                const error = new Error("User could not be deleted");
                error.statusCode = 500;
                throw error;
            }
    
            return result;
        } catch (e) {
            throw e;
        }
    }

static async loginUser( email, password ) {

    try {
        // Validate input
        if (!email || !password) {
            const error = new Error('Email and password are required');
            error.statusCode = 400; // Bad Request
            throw error;
        }

        // Fetch user by email
        const user = await UserRepository.getUserByEmail(email);
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404; // Not Found
            throw error;
        }

        // Compare passwords
const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401; // Unauthorized
            throw error;
        }

        // Return user (or generate a token if needed)
        return user;
    } catch (e) {
        throw e; // Propagate errors to the controller
    }
}

    

    // Optional: Add a method to verify passwords during login
//     static async verifyPassword(email, plainPassword) {
//         try {
//             const user = await UserRepository.getUserByEmail(email);
//             return await bcrypt.compare(plainPassword, user.password);
//         } catch (e) {
//             throw e;
//         }
//     }
  }

module.exports = UserService;