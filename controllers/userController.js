const UserService = require("../services/userService");
const User = require("../models/userModel");

class UserController {
    static async createUser(req, res) {
        try {
            const { first_name, second_name, email, password } = req.body;
            const user = new User(0, first_name, second_name, email, password, null);
            console.log(user)
            const result = await UserService.createUser(user);
           req.session.user = user;
            res.redirect('/dashboard'); // Redirect to the home page after successful registration
        } catch (e) {
            if (e.statusCode === 409) {
                res.status(409).json({ 
                    success: false,
                    error: e.message 
                });
            } else {
                res.status(500).json({ 
                    success: false,
                    error: "Internal server error",
                    details: e.message 
                });
            }
        }
    }

    static async getUserByEmail(req, res) {
        try {
            const { email } = req.params;
            const user = await UserService.getUserByEmail(email);
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(404).json({ 
                    success: false,
                    error: e.message 
                });
            } else {
                res.status(500).json({ 
                    success: false,
                    error: "Internal server error",
                    details: e.message 
                });
            }
        }
    }

    static async getUserByID(req, res) {
        try {
            const { user_id } = req.params; 
            console.log(user_id)
            const user = await UserService.getUserByID(user_id);
            res.status(200).json({
                success: true,
                data: user
            });
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(404).json({ 
                    success: false,
                    error: e.message 
                });
            } else {
                res.status(500).json({ 
                    success: false,
                    error: "Internal server error",
                    details: e.message 
                });
            }
        }
    }

    static async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json({
                success: true,
                data: users
            });
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(404).json({ 
                    success: false,
                    error: e.message 
                });
            } else {
                res.status(500).json({ 
                    success: false,
                    error: "Internal server error",
                    details: e.message 
                });
            }
        }
    }

    static async updateUser(req, res) {
        try {
            const { user_id } = req.params; 
            const updates = req.body;
            const result = await UserService.updateUser(user_id, updates);
            res.status(200).json({
                success: true,
                data: result,
                message: "User updated successfully"
            });
        } catch (e) {
            if (e.statusCode === 400 || e.statusCode === 404 || e.statusCode === 409) {
                res.status(e.statusCode).json({ 
                    success: false,
                    error: e.message 
                });
            } else {
                res.status(500).json({ 
                    success: false,
                    error: "Internal server error",
                    details: e.message 
                });
            }
        }
    }

    static async deleteUser(req, res) {
        try {
            const { user_id } = req.params;
    
            const result = await UserService.deleteUser(user_id);
    
            res.status(200).json({
                success: true,
                data: result,
                message: "User deleted successfully"
            });
        } catch (e) {
            if (e.statusCode === 404) {
                res.status(404).json({
                    success: false,
                    error: e.message
                });
            } else {
                res.status(500).json({
                    success: false,
                    error: "Internal server error",
                    details: e.message
                });
            }
        }
    }

   static async loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const user = await UserService.loginUser(email, password);

        console.log("User logged in:", user);

        req.session.user = user;

        res.redirect('/dashboard');

    } catch (e) {
        if (e.statusCode === 401) {
            // Render the home view and pass the error message
            res.status(401).render('home', {
                errorMessage: 'Invalid email or password'
            });
        } else {
            // Optional: render home with generic error
            res.status(e.statusCode || 500).render('home', {
                errorMessage: 'Login failed. Please try again later.'
            });
        }
    }
}


    
    
}

module.exports = UserController;