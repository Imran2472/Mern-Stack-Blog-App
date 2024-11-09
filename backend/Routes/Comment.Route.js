import express from "express";
import {
  CreatComment,
  DeletComment,
  GetAllComments,
} from "../Controllers/Comment.Controller.js";
import { Authentecation } from "../Midlewear/isAuthenticated.js";

const router = express.Router();

router.post("/post-comment", Authentecation, CreatComment);
router.get("/all-comments/:id", GetAllComments);
router.delete("/delete-comment/:id", Authentecation, DeletComment);

export default router;
