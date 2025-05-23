const User = require("../models/userModel");
const database = require("../config/db");
require('dotenv').config();

class UserRepository {
    static async createUser(user) {
        if (await this.emailExists(user.email)) {
            const error = new Error("Email already exists");
            error.statusCode = 409;
            throw error;
        }
        try {
            let sql = `INSERT INTO user 
            (first_name, second_name, email, password, created_at)
            VALUES (?, ?, ?, ?,?)`;
            const result = await database.query(sql, [
                user.first_name,
                user.second_name,
                user.email,
                user.password, // Note:  I should hash this before passing!
                new Date()
            ]);
            const { affectedRows, insertId } = result;
            return {
                affectedRows,
                insertId: insertId.toString()
            };
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async getUserByEmail(email) {
        if (!await this.emailExists(email)) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        try {
            let sql = `SELECT * FROM user WHERE email = ?`;
            const [row] = await database.query(sql, [email]);
            return User.fromRow(row);
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async getUserByID(user_id) {
        if (!await this.userExistsByID(user_id)) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        try {
            let sql = `SELECT * FROM user WHERE user_id = ?`;
            const [row] = await database.query(sql, [user_id]);
            return User.fromRow(row);
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async getAllUsers() {
        try {
            let sql = `SELECT * FROM user`;
            const rows = await database.query(sql);
            if (!rows || rows.length === 0) {
                const error = new Error("No users found");
                error.statusCode = 404;
                throw error;
            }
            return rows.map(User.fromRow);
        } catch (e) {
            throw e;
        }
    }

    static async updateUser(user_id, updates) {
        if (!await this.userExistsByID(user_id)) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        if (!updates || Object.keys(updates).length === 0) {
            const error = new Error("No updates provided");
            error.statusCode = 400;
            throw error;
        }
        if (updates.email && await this.emailExists(updates.email)) {
            const error = new Error("Email already in use");
            error.statusCode = 409;
            throw error;
        }

        try {
            let sql = `UPDATE user SET `;
            const conditions = [];
            const values = [];
            for (const key in updates) {
                conditions.push(`${key} = ?`);
                values.push(updates[key]);
            }
            sql += conditions.join(", ") + " WHERE user_id = ?";
            values.push(user_id);
            const result = await database.query(sql, values);
            return { affectedRows: result.affectedRows };
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async deleteUser(user_id) {
        // Check if user exists
        if (!await this.userExistsByID(user_id)) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
    
        try {
            let sql = `DELETE FROM \`user\` WHERE user_id = ?`;
            const result = await database.query(sql, [user_id]);
    
            // ✅ Safely extract affectedRows
            const { affectedRows } = result;
    
            return { affectedRows };
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }
    

    static async emailExists(email) {
        try {
            const sql = `SELECT * FROM user WHERE email = ?`;
            const rows = await database.query(sql, [email]);
    
            if (rows && rows.length > 0) {
                return true;
            }
            return false;
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

    static async userExistsByID(user_id) {
        try {
            const sql = `SELECT * FROM user WHERE user_id = ?`;
            const rows = await database.query(sql, [user_id]);
    
            if (rows && rows.length > 0) {
                return true;
            }
            return false;
        } catch (e) {
            throw new Error(e.sqlMessage);
        }
    }

     static async validateCredentials(email, password) {
        try {
            const user = await UserRepository.getUserByEmail(email);
            
            if (!user) {
                const error = new Error("Invalid credentials");
                error.statusCode = 401;
                throw error;
            }

            if (user.password !== password) {
                const error = new Error("Invalid credentials");
                error.statusCode = 401;
                throw error;
            }

            // Return user data without password
            return {
                id: user.id,
                name: user.name,
                email: user.email
            };
            
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserRepository;