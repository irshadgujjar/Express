
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./Router/user");

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI);

//Here we know about the database connection
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err.message);
});

mongoose.connection.once("open", () => {
  console.log("DB Connected Successfully");
});
// User Routes
app.use("/api", userRouter);

// Server Listening
const SERVER_PORT = process.env.SERVER_PORT ;
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on PORT ${SERVER_PORT}`);
});
