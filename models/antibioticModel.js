/**
 * Represents an Antibiotic entity in the system.
 */
class Antibiotic {
    /**
     * Creates a new Antibiotic instance.
     * @param {number} antibiotic_id - Unique ID of the antibiotic (0 if new)
     * @param {string} name - Name of the antibiotic
     * @param {number} maximum_safe_concentration - Max safe concentration in mg/L
     */
    constructor(antibiotic_id, name, maximum_safe_concentration) {
        this.antibiotic_id = antibiotic_id;
        this.name = name;
        this.maximum_safe_concentration = maximum_safe_concentration;
    }

    /**
     * Creates an Antibiotic object from a database row.
     * @param {Object} row - Row from the database
     * @returns {Antibiotic}
     */
    static fromRow(row) {
        return new Antibiotic(
            row.antibiotic_id,
            row.name,
            row.maximum_safe_concentration
        );
    }
}

// Export the Antibiotic class
module.exports = Antibiotic;