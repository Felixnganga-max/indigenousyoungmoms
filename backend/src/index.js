require("dotenv").config(); // Move this to the top
const express = require("express");
const cors = require("cors");
const DbConnection = require("./config/db");
const authRoutes = require("./routes/User");
const galleryRoutes = require("./routes/Gallery");
const programRoutes = require("./routes/Programs");
const projectRoutes = require("./routes/Projects");
const contentRoutes = require("./routes/Content");
const eventsRoute = require("./routes/Events");
const aboutRoutes = require("./routes/About");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/programs", programRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/events", eventsRoute);
app.use("/api/about", aboutRoutes); // Add this line

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Initialize database connection
const startServer = async () => {
  try {
    // Connect to database first
    await DbConnection();
    console.log("Database connected successfully!");

    // Only start server in development
    if (process.env.NODE_ENV !== "production" && !process.env.VERCEL) {
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    }
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Start the server
startServer();

// Export the Express app for Vercel
module.exports = app;
