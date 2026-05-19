import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import jwt from "jsonwebtoken";
import authenticateUser from "./middlewares/authenticate.js";
import productRouter from "./routes/productRouter.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());

app.use(authenticateUser);


app.use("/users", userRouter);
app.use("/products", productRouter);


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log("MongoDB connection failed");
    console.log(error.message);
  });



app.listen(3000, () => {
  console.log("Server is running!");
});