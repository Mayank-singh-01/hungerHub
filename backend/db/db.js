const mongoose = require("mongoose");

const mongoUrl ="mongodb://localhost:27017/yourDatabaseName";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected sucessfully");

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
