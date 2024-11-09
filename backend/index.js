import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Userrouter from "./Routes/User.Router.js";
import BlogRoute from "./Routes/Blog.Route.js";
import CommentRoute from "./Routes/Comment.Route.js";
import HomeRoute from "./Routes/HomePage.Route.js";
const app = express();

app.use(json());
dotenv.config();
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
const port = process.env.PORT || 4000;
app.get("/", (req, res) => {
  res.send("Hello from the server!");
});
//  "mongodb+srv://picsswap9:RGhWkUjQjKtyvRaB@cluster0.njb4a.mongodb.net/"
try {
  mongoose.connect(
    "mongodb://picsswap9:RGhWkUjQjKtyvRaB@cluster0-shard-00-00.njb4a.mongodb.net:27017,cluster0-shard-00-01.njb4a.mongodb.net:27017,cluster0-shard-00-02.njb4a.mongodb.net:27017/?replicaSet=atlas-11wgcq-shard-0&ssl=true&authSource=admin",
    {
      dbName: "my_blog",
    },
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  console.log("Mongoose Connected");
} catch (error) {
  console.log("Error While Connecting to Mongoose", error.message);
}
// Routes
app.use("/api/user", Userrouter);
app.use("/api/blog", BlogRoute);
app.use("/api/comment", CommentRoute);
app.use("/api/home", HomeRoute);

app.listen(port, () => {
  console.log(`Server is Running at http://localhost:${port}`);
});
