import React from "react";
import Navbar from "../Navbar/Navbar";
import HomePageData from "./HomePageData";
import MinBlog from "../Blogs/MinBlog";
import Footer from "../Footer/Footer";

function HomePage() {
  return (
    <>
      <Navbar />
      <div>
        <HomePageData />
      </div>
      <>
        <MinBlog />
      </>
      <Footer />
    </>
  );
}

export default HomePage;
