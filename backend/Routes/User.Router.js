import express from "express";
import {
  GetProfile,
  GetSingleUser,
  Login,
  Register,
  UpdateProfile,
  GetAllUser,
  DeleteUser,
  UpdateUser,
} from "../Controllers/User.Controller.js";
import upload from "../Models/upload.js";
import { Authentecation, isAdmin } from "../Midlewear/isAuthenticated.js";

const router = express.Router();

router.post("/register", upload.single("image"), Register);
router.post("/login", Login);
router.get("/profile", Authentecation, GetProfile);
router.put(
  "/update-profile/:id",
  upload.single("image"),
  Authentecation,
  UpdateProfile
);
router.get("/getsingleprofile/:id", Authentecation, GetSingleUser);
router.get("/allusers", Authentecation, GetAllUser);
router.delete("/delet-user/:id", Authentecation, isAdmin, DeleteUser);
router.put("/update-role/:id", Authentecation, isAdmin, UpdateUser);

export default router;
