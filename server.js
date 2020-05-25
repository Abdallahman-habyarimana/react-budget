const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Code to run the server
app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/budget/api/users", require("./api/users"));
app.use("/budget/api/auth", require("./api/auth"));
app.use("/budget/api/profile", require("./api/profiles"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
