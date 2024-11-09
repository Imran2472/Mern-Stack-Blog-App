import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../../State/AppContext";
import Navbar from "../Navbar/Navbar";

function AllBlogs() {
  const { blog } = useContext(AppContext);
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="grid grid-cols-4 gap-4 items-center px-[100px] py-[3rem]">
        {blog?.blog?.map((items) => (
          <Link to={`/blog/${items._id}`} key={items._id}>
            <div className="blog border bg-white p-4 rounded-lg">
              <div className="image">
                <img
                  src={items?.coverImg}
                  alt=""
                  className="w-[100%] object-cover h-[200px]"
                />
              </div>
              <div className="info mt-4">
                <h1 className="text-sm font-normal text-gray-800 title_wrap">
                  {items?.title}
                </h1>
                <div className="author pt-4 flex items-center gap-3">
                  <div className="image">
                    <img
                      src={items?.author?.image}
                      alt=""
                      className="h-[35px] w-[35px] rounded-full object-cover"
                    />
                  </div>
                  <div className="text-[11px] font-medium text-gray-600">
                    {items?.author?.name}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default AllBlogs;
