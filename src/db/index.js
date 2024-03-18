import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectionInstance = mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `database connection success: ${(await connectionInstance).connection.host} `
    );
  } catch (error) {
    console.log(`database connection error:${error}`);
    process.exit(1);
  }
};
export default connectDB;
