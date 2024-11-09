import express from "express";
import { Authentecation } from "../Midlewear/isAuthenticated.js";
import {
  HomePageCreat,
  HomePageGet,
  HomePageUpdate,
  SingleHomeFind,
} from "../Controllers/HomePage.Controller.js";
import upload from "../Models/upload.js";

const router = express.Router();

router.post(
  "/creat-home-page",
  Authentecation,
  upload.single("home-image"),
  HomePageCreat
);
router.get("/home-page", HomePageGet);
router.get("/home-find-by-id/:id", SingleHomeFind);
router.put(
  "/update-home-page/:id",
  upload.single("home-image"),
  Authentecation,
  HomePageUpdate
);

export default router;
