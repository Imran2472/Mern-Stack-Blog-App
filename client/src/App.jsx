import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Components/Home/HomePage";
import About from "./Components/AboutPage/About";
import Contact from "./Components/ContactPage/Contact";
import Login from "./Components/RegistrationPage/Login";
import Register from "./Components/RegistrationPage/Register";
import NotFoundPage from "./Components/NotFoundPage/NotFoundPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./Components/Profile/Profile";
import CreatBlogPage from "./Components/Blogs/CreatBlogPage";
import SingleBlog from "./Components/Blogs/SingleBlog";
import AllBlogs from "./Components/Blogs/AllBlogs";
import AdminHomeCreat from "./Components/Admin/AdminHomeCreat";
import User from "./Components/Admin/User";
import AllAdminBlog from "./Components/Admin/AllAdminBlog";
import UpdateBlog from "./Components/Admin/UpdateBlog";
import UserBlog from "./Components/Blogs/UserBlog";
function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />} />

        {/* Add more routes here */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="/creat-blog" element={<CreatBlogPage />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="/all-blogs" element={<AllBlogs />} />
        <Route path="/update-page-text/:id" element={<AdminHomeCreat />} />
        <Route path="/creat-blogs" element={<CreatBlogPage />} />
        <Route path="/all-users" element={<User />} />
        <Route path="/admin-blogs-all" element={<AllAdminBlog />} />
        <Route path="update-blog/:id" element={<UpdateBlog />} />
        <Route path="/my-blogs" element={<UserBlog />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
