import Blog from "../Models/Blogs.Models.js";
import cloudinary from "../Models/Cloudinary.js";
import Comment from "../Models/Coment.Model.js";
import fs from "fs";
import User from "../Models/User.Model.js";
export const CreatBlog = async (req, res) => {
  try {
    const { title, description, content, category, Rating } = req.body;
    const coverImg = req.file;
    const Auther = req.user.user._id;
    if (coverImg) {
      const imageSrc = await cloudinary.uploader.upload(coverImg.path);
      fs.unlinkSync(coverImg.path);
      const blog = new Blog({
        author: Auther,
        title,
        description,
        content,
        coverImg: imageSrc.secure_url,
        category,
        Rating,
      });
      await blog.save();
      res.json({ success: true, message: "Blog created successfully", blog });
    } else {
      res.json({ success: false, message: "Image is required" });
    }
  } catch (error) {
    console.log("Error while creating blog", error.message);
    res.json({ success: false, message: "Error while creating blog" });
  }
};

export const ALlBlogs = async (req, res) => {
  try {
    const blog = await Blog.find()
      .sort({ createdAt: -1 })
      .populate("author", "name email image");
    res.json({
      success: true,
      message: "fetched All Blogs successfully",
      blog,
    });
  } catch (error) {
    console.log("Error while etched All Blogs ", error.message);
    res.json({ success: false, message: "Error while etched All Blogs " });
  }
};

export const UpdateBlog = async (req, res) => {
  try {
    const { title, description, content, category, Rating } = req.body;
    const { id } = req.params;
    const blog = await Blog.findById(id.split(" ")[0]);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }
    blog.title = title;
    blog.description = description;
    blog.content = content;
    blog.category = category;
    blog.Rating = Rating;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      fs.unlinkSync(req.file.path);
      blog.coverImg = result.secure_url;
    }
    await blog.save();
    res.json({ success: true, message: "Blog updated successfully", blog });
  } catch (error) {
    console.log("Error while Update Blogs ", error.message);
    res.json({ success: false, message: "Error while Update Blogs " });
  }
};

export const GetSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id.split(" ")[0]).populate(
      "author",
      "name email image"
    );
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }
    res.json({
      success: true,
      message: "Blog fetched successfully",
      blog,
    });
  } catch (error) {
    console.log("Error while Single Blogs ", error.message);
    res.json({ success: false, message: "Error while Single Blogs " });
  }
};

export const DeletBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.log("Error While Deleting Blog", error.message);
    res.json({ success: false, message: "Error While Deleting Blog" });
  }
};
