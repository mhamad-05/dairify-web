/**
 * Represents an Enzyme used to neutralize antibiotics.
 */
class Enzyme {
    /**
     * Creates a new Enzyme instance.
     * @param {number} enzyme_id - Unique ID of the enzyme (0 if new)
     * @param {string} name - Name of the enzyme
     * @param {string} target_antibiotic - Target antibiotic type
     * @param {number} effectiveness_level - Neutralization effectiveness (0–1)
     * @param {number|null} test_id - Optional test result ID
     */
    constructor(enzyme_id, name, target_antibiotic, effectiveness_level, test_id) {
        this.enzyme_id = enzyme_id;
        this.name = name;
        this.target_antibiotic = target_antibiotic;
        this.effectiveness_level = effectiveness_level;
        this.test_id = test_id; // test_id can be null
    }

    /**
     * Creates an Enzyme object from a database row.
     * @param {Object} row - Database row
     * @returns {Enzyme}
     */
    static fromRow(row) {
        return new Enzyme(
            row.enzyme_id,
            row.name,
            row.target_antibiotic,
            row.effectiveness_level,
            row.test_id
        );
    }
}

// Export the Enzyme class
module.exports = Enzyme;