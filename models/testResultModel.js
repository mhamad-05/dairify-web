/**
 * Represents a test result showing detection outcome.
 */
class TestResult {
    /**
     * Creates a new TestResult instance.
     * @param {number} test_id - Unique ID of the test (0 if new)
     * @param {number} sample_id - ID of the tested sample
     * @param {string} result_status - Detected / Clean
     * @param {number} antibiotic_id - Optional detected antibiotic
     * @param {number} enzyme_id - Optional enzyme used
     */
    constructor(test_id, sample_id, result_status, antibiotic_id, enzyme_id) {
        this.test_id = test_id;
        this.sample_id = sample_id;
        this.result_status = result_status;
        this.antibiotic_id = antibiotic_id;
        this.enzyme_id = enzyme_id;
    }

    /**
     * Creates a TestResult object from a database row.
     * @param {Object} row - Database row
     * @returns {TestResult}
     */
    static fromRow(row) {
        return new TestResult(
            row.test_id,
            row.sample_id,
            row.result_status,
            row.antibiotic_id,
            row.enzyme_id
        );
    }
}

// Export the TestResult class
module.exports = TestResult;