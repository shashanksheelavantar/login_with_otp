const { Client } = require('pg');

const client = new Client({
    host: '127.0.0.1',
    user: 'shashanka',
    database: 'student',
    password: 'shashank@2003',
    port: 5432,
});

// Connect to PostgreSQL
client.connect(err => {
    if (err) {
        console.log("Connection error:", err.stack);
    } else {
        console.log("Connected to PostgreSQL");
    }
});

/*
client.query('SELECT * FROM question', (err, result) => {
    if (err) {
        console.log("Error in the query:", err.stack);
    } else {
        console.log("Result:", result);
    }
});
*/

// Function to get questions by level
const getQuestionLevel = async (level) => {
    try {
        const result = await client.query('SELECT question FROM question WHERE level = $1', [level]);
        console.log("Result:", result.rows);
    } catch (err) {
        console.log('Error in query:', err.stack);
    }
};







module.exports = { client, getQuestionLevel };
