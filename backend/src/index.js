// require("dotenv").config(); // Move this to the top
// const express = require("express");
// const cors = require("cors");
// const DbConnection = require("./config/db");

// const authRoutes = require("./routes/User");
// const galleryRoutes = require("./routes/Gallery");
// const programRoutes = require("./routes/Programs");

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.get("/", (req, res) => {
//   res.send("Hello, Express!");
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/gallery", galleryRoutes);
// app.use("/api/programs", programRoutes);

// // Health check route
// app.get("/api/health", (req, res) => {
//   res.json({ success: true, message: "Server is running" });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     message: "Something went wrong!",
//   });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found",
//   });
// });

// // Connect to MongoDB and start server
// const startServer = async () => {
//   try {
//     await DbConnection(); // Connect to database first

//     app.listen(PORT, () => {
//       console.log(`Server is running on http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error("Failed to start server:", error);
//     process.exit(1);
//   }
// };

// startServer();

require("dotenv").config(); // Always at top
const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const DbConnection = require("./config/db");

const authRoutes = require("./routes/User");
const galleryRoutes = require("./routes/Gallery");
const programRoutes = require("./routes/Programs");

const app = express();

// Connect DB before server starts
DbConnection();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Hello, Serverless Express!");
});
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});
app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/programs", programRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ✅ THIS is the correct export for Vercel Serverless
module.exports = serverless(app);
