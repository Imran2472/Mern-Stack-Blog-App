import express from "express";
import upload from "../Models/upload.js";
import {
  ALlBlogs,
  CreatBlog,
  DeletBlog,
  GetSingleBlog,
  UpdateBlog,
} from "../Controllers/Blogs.Controller.js";
import { Authentecation } from "../Midlewear/isAuthenticated.js";
// import { Authentecation } from "../Midlewear/isAuthenticated.js";

const router = express.Router();

// Importing controllers
router.post(
  "/creat-blog",
  upload.single("coverImg"),
  Authentecation,
  CreatBlog
);
router.get("/", ALlBlogs);
router.delete("/delete-blog/:id", DeletBlog);
router.put(
  "/update-blog/:id",
  upload.single("coverImg"),
  Authentecation,
  UpdateBlog
);
router.get("/:id", GetSingleBlog);

export default router;
