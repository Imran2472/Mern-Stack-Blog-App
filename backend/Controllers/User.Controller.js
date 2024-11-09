import User from "../Models/User.Model.js";
import bcrypt from "bcrypt";
import fs from "fs";
import jwt from "jsonwebtoken";
import cloudinary from "../Models/Cloudinary.js";
export const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const image = req.file.path;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    if (image) {
      const imageSrc = await cloudinary.uploader.upload(image);
      fs.unlinkSync(image);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        image: imageSrc.secure_url,
      });
      await newUser.save();
      res.json({
        success: true,
        message: "User registered successfully",
        newUser,
      });
    }
  } catch (error) {
    console.log("Error While Register", error.message);
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ message: "Incorrect password" });
    }
    const token = jwt.sign({ user }, process.env.SECERATE_KEY, {
      expiresIn: "48h",
    });
    res.json({
      success: true,
      message: "Logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.log("Error While Login", error.message);
    res.json({ message: "Error While Login" }, error.message);
  }
};

export const GetProfile = async (req, res) => {
  try {
    res.json({
      success: true,
      message: "User Profile",
      profile: req.user,
    });
  } catch (error) {
    console.log("Error While GetProfile", error.message);
    res.json({ message: "Error While GetProfile" }, error.message);
  }
};

export const UpdateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { id } = req.params;
    const user = await User.findById(id.split(" ")[0]);
    if (!user) {
      return res.status(404).json({ message: "User  not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.name = name;
    user.email = email;
    user.password = hashedPassword;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      fs.unlinkSync(req.file.path);
      user.image = result.secure_url;
    }

    await user.save();
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    console.log("Error While UpdateProfile", error.message);
    res.json({ message: "Error While UpdateProfile" }, error.message);
  }
};

export const GetSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.json({ message: "User not found" });
    }
    res.json({
      success: true,
      message: "User Found",
      user,
    });
  } catch (error) {}
};

export const GetAllUser = async (req, res) => {
  try {
    const user = await User.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      message: "All Users fetched successfully",
      user,
    });
  } catch (error) {}
};

// delet user

export const DeleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ message: "User not found" });
    }
    // findanddeletnuid user
    await User.findByIdAndDelete(user);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.log("Error While DeleteUser", error.message);
    res.json({ message: "Error While DeleteUser" }, error.message);
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const { role } = req.body;
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ message: "User not found" });
    }
    user.role = role;
    await user.save();
    res.json({
      success: true,
      message: "User role updated successfully",
      user,
    });
  } catch (error) {
    console.log("Error While UpdateUser", error.message);
    res.json({ message: "Error While UpdateUser" }, error.message);
  }
};
