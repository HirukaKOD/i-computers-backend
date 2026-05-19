import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import jwt from "jsonwebtoken";
import authenticateUser from "./middlewares/authenticate.js";
import productRouter from "./routes/productRouter.js";

const app = express();

app.use(express.json());

app.use(authenticateUser);


app.use("/users", userRouter);
app.use("/products", productRouter);


// MongoDB connection
mongoose
  .connect("mongodb://hiruka:121412@ac-lzwrmmt-shard-00-00.w92ym8n.mongodb.net:27017,ac-lzwrmmt-shard-00-01.w92ym8n.mongodb.net:27017,ac-lzwrmmt-shard-00-02.w92ym8n.mongodb.net:27017/?ssl=true&replicaSet=atlas-yni42q-shard-0&authSource=admin&appName=Cluster0")
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