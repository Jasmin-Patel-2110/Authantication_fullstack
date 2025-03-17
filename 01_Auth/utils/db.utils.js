import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

/*
  Connect to database using mongoose
  connect function returns a promise.
*/
const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("MongoDB connected...");
    })
    .catch((e) => {
      console.log("MongoDB error ", e);
    });
};

export default connectDB;
