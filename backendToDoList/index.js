const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const users = require("./routes/toDo_route.js"); 

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const PORT = 3000;

app.use(users);

async function initializeDatabase() {
mongoose
  .connect("mongodb+srv://krishna:eVaX6kVD1NuzvR7Z@cluster0.w5ft0um.mongodb.net/")
  .then(() => {
    console.log(`Connected to Database`);
  })
  .catch((err) => {
    console.log(err);
  });
}

  async function initializeServer() {
    try {
      // Initialize database connection
      await initializeDatabase();
  
      // Other asynchronous initializations
  
      // Start the server
      app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
      });
    } catch (error) {
      console.error('Initialization failed:', error);
    }
  }
  
  initializeServer();