require("dotenv").config();
const mongoose = require("mongoose");

const DbConnection = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://standardwebtechnologies:PSmoZoH1Os9XoQpa@cluster0.7qd3fuf.mongodb.net/IYM"
    );
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = DbConnection;
