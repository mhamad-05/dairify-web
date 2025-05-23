/**
 * Represents research data linked to a test result.
 */
class ResearchData {
    /**
     * Creates a new ResearchData instance.
     * @param {number} research_id - Unique ID of the research entry
     * @param {string} findings - Scientific findings or notes
     * @param {string} published_at - Date research was published
     * @param {number} test_id - Associated test result ID
     */
    constructor(research_id, findings, published_at, test_id) {
        this.research_id = research_id;
        this.findings = findings;
        this.published_at = published_at;
        this.test_id = test_id;
    }

    /**
     * Creates a ResearchData object from a database row.
     * @param {Object} row - Database row
     * @returns {ResearchData}
     */
    static fromRow(row) {
        return new ResearchData(
            row.research_id,
            row.findings,
            row.published_at,
            row.test_id
        );
    }
}

// Export the ResearchData class
module.exports = ResearchData;