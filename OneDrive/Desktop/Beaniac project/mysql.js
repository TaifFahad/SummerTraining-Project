// Description: This file contains the code for connecting to the database and inserting data into the 'contactus' table.

// Setting up the MySQL2 connection
const mysql = require("mysql2");
let isDBConnected = false;
const db = mysql.createConnection({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "root",
    database: "beaniaccontact",
    port: 3306,
});

/**
 * Establishes a connection to the database if not already connected.
 */
function startDatabaseConnection() {
    if (!isDBConnected) {
        db.connect((err) => {
            if (err) {
                console.error("Error connecting to the database: " + err.stack);
                return;
            }
            initializeContactUsTable();
            console.log("Connected to the database as threadID: " + db.threadId);
            isDBConnected = true;
        });
    }
}

/**
 * Initializes the 'contactus' table in the database.
 * If the table already exists, it logs a message; otherwise, it creates the table.
 */
function initializeContactUsTable() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS \`contactus\` (
            \`name\` varchar(100) NOT NULL,
            \`gender\` varchar(10) NOT NULL,
            \`phonenum\` varchar(10) CHARACTER SET ucs2 NOT NULL,
            \`dateofbirth\` date NOT NULL,
            \`email\` varchar(100) CHARACTER SET ucs2 NOT NULL,
            \`communicationlang\` varchar(100) CHARACTER SET ucs2 NOT NULL,
            \`comment\` varchar(200) CHARACTER SET ucs2 NOT NULL,
            PRIMARY KEY (\`phonenum\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;

    db.query(createTableQuery, (err) => {
        if (err && err.code !== "ER_TABLE_EXISTS_ERROR") {
            console.error(err.message);
        };
    });
}

/**
 * Inserts data into the 'contactus' table in the database.
 * @param {Object} data - The data to be inserted into the table.
 * @returns {Promise} - A promise that resolves if the data is inserted successfully; otherwise, it rejects with an error.
 * @throws {Error} - An error is thrown if the data to be inserted is a duplicate entry.
 * @throws {Error} - An error is thrown if the data is not inserted successfully.
 * @throws {Error} - An error is thrown if an unexpected error occurs.
 */
function insertContactUsData(data) {
    return new Promise((resolve, reject) => {
        const insertQuery = "INSERT INTO contactus SET ?";
        db.query(insertQuery, data, (error) => {
            if (error) {
                if (error.code === "ER_DUP_ENTRY") {
                    reject("Duplicate entry detected."); // Duplicate entry error
                } else if (error.code) {
                    reject(new Error(error.code)); // Other errors
                } else {
                    console.error("Unexpected error:", error);
                    reject(new Error("Unexpected error occurred.")); // Unexpected error
                }
            } else {
                resolve();
            }
            console.log("Data inserted successfully into 'contactus' table!");
        });
    });
}


/**
 * Retrieves all the data from the 'contactus' table in the database.
 * @returns {Promise} - A promise that resolves with the data if the data is retrieved successfully; otherwise, it rejects with an error.
 * @throws {Error} - An error is thrown if the data is not retrieved successfully.
 */
function retrieveContactUsData() {
    return new Promise((resolve, reject) => {
        const selectQuery = "SELECT * FROM contactus";
        db.query(selectQuery, (error, results) => {
            if (error) {
                reject(new Error(error.code));
            } else {
                resolve(results);
            }
        });
    });
}



/**
 * Closes the connection to the database. 
 */
function stopDatabaseConnection() {
    db.end((err) => {
        if (err) {
            console.error("Error disconnecting from the database: " + err.stack);
            return;
        }
        console.log("Disconnected from the database as threadID: " + db.threadId);
        isDBConnected = false;
    });
}

// Exporting functions for external use
module.exports = {
    startDatabaseConnection,
    initializeContactUsTable,
    insertContactUsData,
    retrieveContactUsData,
    stopDatabaseConnection,
};