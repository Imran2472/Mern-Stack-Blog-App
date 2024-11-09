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

try {
  mongoose.connect(
    `${process.env.MONGOOSEURI}`,
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
