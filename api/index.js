import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
dotenv.config();

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();

app.listen(3000, () => {
  console.log("port is running on 3000");
});
app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
