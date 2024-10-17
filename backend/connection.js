const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    await mongoose
      .connect(
        `mongodb+srv://${process.env.USER_DB}:${process.env.USER_PASSWORD}@cluster0.fwds8.mongodb.net/MERN_bass?retryWrites=true&w=majority&appName=Cluster0`
      )
      .then((res) => console.log("Db is connected"))
      .catch((err) => console.log("Db is not connected", err));
  } catch (error) {
    console.log("mongo db is not connected", error);
  }
};

module.exports = connectDB;
