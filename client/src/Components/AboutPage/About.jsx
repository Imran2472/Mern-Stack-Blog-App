import React from "react";
import Navbar from "../Navbar/Navbar";
import aboutImg from "../../assets/about.jpg";
import aboutblog from "../../assets/aboutblog.png";
import Footer from "../Footer/Footer";
function About() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="banner w-[100%] h-[450px] relative flex items-center justify-center flex-col">
        <img
          src={aboutImg}
          alt="About"
          className="w-[100%] h-[100%] object-cover bg-no-repeat bg-cover bg-fixed object-bottom"
        />
        <div className="overlay absolute top-0 left-0 right-0 bottom-0 bg-primary"></div>
        <div className="info absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center">
          <h1 className="text-gray-50 text-3xl font-bold">
            Welcome to Our Journey: The Story Behind Your Blogs and Fun
          </h1>
          <p className="text-xs font-medium text-gray-300 my-3">
            Ever wondered what makes us tick? In this post, we'll share our
            story, from humble beginnings to where we are today. You'll learn
            about our team, our values, and what drives us to create content
            that resonates with our audience.
          </p>
          {/* button  */}
          <button className="px-7 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-primary-dark rounded-lg hover:bg-blue-800">
            Learn More
          </button>
        </div>
      </div>

      <div className="about-section py-12 px-[100px] pt-[7rem]">
        <div className="grid grid-cols-2 gap-10">
          <div className="about-content">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="text-sm font-medium text-gray-600 mt-3 text-justify">
              Our mission is to create a platform that connects bloggers,
              readers, and inspires people to create their own content. We
              believe that by fostering a love for blogging and sharing our
              stories, we can empower individuals to reach their full potential
              and help others achieve their goals.
            </p>
            <p className="text-sm font-medium text-gray-600 mt-4 text-justify">
              Welcome to my corner of the internet, where words come alive and
              stories unfold. As a passionate blogger, I'm dedicated to sharing
              my thoughts, experiences, and expertise on a wide range of topics.
              From writing tips and tricks to personal anecdotes and industry
              insights, I hope to inspire and educate you on your own writing
              journey
            </p>

            <p className="text-sm font-medium text-gray-600 mt-4 text-justify">
              I'm excited to share my journey with you, and I'm confident that
              you'll be inspired and inspired by my experiences as well. I'm
              always here to help you with your writing, your thoughts, and your
              goals. So, let's get started!
            </p>
            {/* button  */}
            <div className="mt-4">
              <button className="px-7 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-primary-dark rounded-lg hover:bg-blue-800">
                Start Writing Now
              </button>
            </div>
          </div>
          <div className="about-img">
            <img
              src={aboutblog}
              alt="About"
              className="rounded-xl w-[100%] h-[100%]"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
