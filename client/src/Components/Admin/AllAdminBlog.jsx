import React, { useContext } from "react";
import Navbar from "../Navbar/Navbar";
import SideNav from "../Blogs/SideNav";
import AppContext from "../../State/AppContext";
import { useNavigate } from "react-router-dom";

function AllAdminBlog() {
  const { blog, DeletBLogs } = useContext(AppContext);
  const navigate = useNavigate();
  //   console.log(blog);
  return (
    <div>
      <Navbar />
      <SideNav />
      {/* Add your blog listing here */}
      <div className="pl-[320px] py-[5rem]">
        <h1 className="text-center text-black text-3xl font-semibold my-5">
          All Blogs
        </h1>
        <div className="grid grid-cols-3 gap-3 px-[20px]">
          {blog?.blog?.map((data) => (
            <div className="cols-blog bg-white p-4" key={data?._id}>
              <div className="image w-[100%] ">
                <img
                  src={data?.coverImg}
                  alt=""
                  className="w-[100%] h-[100%] object-contain"
                />
              </div>
              <div className="title title_wrap text-base text-gray-900 font-normal mt-5">
                {data?.title}
              </div>
              <p className="title_wrap text-xs text-gray-600 mt-2">
                {data?.description}
              </p>
              {/* update and delet button  */}
              <div className="flex gap-2 items-center mt-4">
                <button
                  className="bg-blue-500 text-xs p-2 text-white rounded-md "
                  onClick={() => navigate(`/update-blog/${data?._id}`)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-xs p-2 text-white rounded-md "
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this item?"))
                      DeletBLogs(data?._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllAdminBlog;
