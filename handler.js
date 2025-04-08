const serverless = require("serverless-http");
const express = require("express");
const connectDB = require('./db/dbconnection'); // Import DB connection
const userRoutes = require('./routes/user.routes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectDB();

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get('/test', (req, res) => {
  res.status(200).send('Hello from Express in Serverless!');
});
// Define API routes
app.use('/api', userRoutes);


app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
