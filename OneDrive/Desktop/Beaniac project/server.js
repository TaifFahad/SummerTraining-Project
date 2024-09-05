// Description: This file contains the code for the server side of the application.
// It creates a server that listens for requests on port 3000. It also contains the code for connecting to the database and inserting data into the 'contactus' table.

const {
  startDatabaseConnection,
  initializeContactUsTable,
  insertContactUsData,
  retrieveContactUsData,
  stopDatabaseConnection
} = require("./mysql");

const express = require("express");
const app = express();

// Connect to the database
startDatabaseConnection();


// Serving static website from the "website" directory
app.use("/", express.static("website"));
app.use(express.json());


app.get("/showdata", async (req, res) => {
  try {
    // Retrieve data from the 'contactus' table in the database
    let data = await retrieveContactUsData();

    // Send success response
    res.status(200).json(data);
  } catch (err) {
    // Send error response
    res.sendStatus(500);
  }
});

// Route for inserting data into the database
app.post("/insert", async (req, res) => {
  try {
    // Extract data from the request body
    let data = req.body;

    // Insert data into the 'contactus' table in the database
    await insertContactUsData(data);

    // Send success response
    res.sendStatus(200);
  } catch (err) {
    if (err === "Duplicate entry detected.") {
      // Duplicate entry error
      res.sendStatus(409);
    } else {
      // Other errors
      res.sendStatus(500);
    }
  }
});


// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


// Graceful shutdown
process.on("SIGINT", () => {
  stopDatabaseConnection();
  process.exit();
});