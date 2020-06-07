import mongoose from "mongoose";
import { app } from "./app";
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be define!");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be define!");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("\x1b[32m", "Connected to MongoDB!!!");
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log("\x1b[32m", "AUTH is Listening  on port 3000!!!");
  });
};
start();
