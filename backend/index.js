const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectMongoDB = require("./db/db.js");

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

// CORS configuration
const corsOptions = {
  origin: process.env.CORSE_ORIGIN, 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
  credentials: true, // Allow credentials
};

app.use(cors(corsOptions));

app.use(express.json());

// Connect to MongoDB and then start the server
connectMongoDB()
  .then(() => {
    // Routes
    app.use("/api", require("./routes/creatUser.js"));
    app.use("/api", require("./routes/displayData.js"));
    app.use("/api", require("./routes/orderRouter.js"));

    app.get("/", (req, res) => {
      res.send("Hello, Mayank this side");
    });

    app.use((req, res, next) => {
      res.status(404).send("Not Found");
    });

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send("Something broke!");
    });

    // Start server
    app.listen(port, () => {
      console.log(`App started at port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1); // Exit process with failure
  });
