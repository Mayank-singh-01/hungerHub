const mongoose = require("mongoose");

const mongoUrl =
  process.env.MONGODB_URI ||
  "mongodb+srv://mayank23378:9507769566@cluster0.vbtka.mongodb.net/";

const mongoDB = async () => {
  try {
    // Connecting to MongoDB (no need for useNewUrlParser and useUnifiedTopology)
    await mongoose.connect(mongoUrl, { dbName: "yourDatabaseName" });
    
    console.log("MongoDB connected successfully");

    const db = mongoose.connection.db;

    // Fetch foodData collection
    global.foodData = await db.collection("foodData").find({}).toArray();
    console.log("Food data loaded");

    // Fetch foodCategory collection
    global.foodCategory = await db
      .collection("foodCategory")
      .find({})
      .toArray();
    console.log("Food category data loaded");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = mongoDB;
