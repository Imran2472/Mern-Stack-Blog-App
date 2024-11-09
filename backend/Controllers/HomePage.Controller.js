import cloudinary from "../Models/Cloudinary.js";
import Home from "../Models/HomePage.Model.js";
import fs from "fs";
export const HomePageCreat = async (req, res) => {
  try {
    const { homeText, subText, buttonText, link } = req.body;
    const image = req.file;
    if (!image) {
      res.json({
        success: false,
        message: "Image is required",
      });
    }
    const result = await cloudinary.uploader.upload(image.path);
    fs.unlinkSync(image.path);
    const newHome = new Home({
      homeText,
      subText,
      buttonText,
      link,
      image: result.secure_url,
    });
    await newHome.save();
    res.json({
      success: true,
      message: "Home Page created successfully",
      newHome,
    });
  } catch (error) {
    console.log("Error while creating Home Page", error.message);
    res.json({
      success: false,
      message: "Error while creating Home Page",
    });
  }
};

export const HomePageGet = async (req, res) => {
  try {
    const home = await Home.find().sort({ creatAt: -1 });
    res.json({
      success: true,
      message: "Home Page fetched successfully",
      home,
    });
  } catch (error) {
    console.log("Error while fetching Home Page", error.message);
    res.json({
      success: false,
      message: "Error while fetching Home Page",
    });
  }
};

export const HomePageUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const { homeText, subText, buttonText, link } = req.body;
    const image = req.file;
    const home = await Home.findById(id);
    if (!home) {
      return res.json({ message: "Home Page not found" });
    }
    if (image) {
      const res = await cloudinary.uploader.upload(image.path);
      fs.unlinkSync(image.path);
      home.homeText = homeText;
      home.subText = subText;
      home.buttonText = buttonText;
      home.link = link;
      home.image = res.secure_url;
      await home.save();
    } else {
      home.homeText = homeText;
      home.subText = subText;
      home.buttonText = buttonText;
      home.link = link;
      await home.save();
    }
    res.json({
      success: true,
      message: "Home Page updated successfully",
      home,
    });
  } catch (error) {
    console.log("Error while updating Home Page", error.message);
    res.json({
      success: false,
      message: "Error while updating Home Page",
    });
  }
};

export const SingleHomeFind = async (req, res) => {
  try {
    const id = req.params.id;
    const home = await Home.findById(id);
    if (!home) {
      return res.json({ message: "Home Page not found" });
    }
    res.json({
      success: true,
      message: "Home Page fetched successfully",
      home,
    });
  } catch (error) {}
};
