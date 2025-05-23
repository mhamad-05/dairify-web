/**
 * Represents a user in the system.
 */
class User {
    /**
     * Creates a new User instance.
     * @param {number} user_id - Unique ID of the user
     * @param {string} first_name - First name of the user
     * @param {string} second_name - Last name or secondary identifier
     * @param {string} email - User's email address
     * @param {string} password - Hashed password (never stored as plain text)
     * @param {string} created_at - Timestamp when user was created
     */
    constructor(user_id, first_name, second_name, email, password, created_at) {
        this.user_id = user_id;
        this.first_name = first_name;
        this.second_name = second_name;
        this.email = email;
        this.password = password;
        this.created_at = created_at;
    }

    /**
     * Creates a User object from a database row.
     * @param {Object} row - Row from the database
     * @returns {User}
     */
    static fromRow(row) {
        return new User(
            row.user_id,
            row.first_name,
            row.second_name,
            row.email,
            row.password,
            row.created_at
        );
    }
}

// Export the User class
module.exports = User;