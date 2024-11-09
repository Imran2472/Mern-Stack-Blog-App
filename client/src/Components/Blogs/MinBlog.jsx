import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../State/AppContext";
import { Link } from "react-router-dom";

function MinBlog() {
  const { blog } = useContext(AppContext);

  const [lastSixPosts, setLastSixPosts] = useState([]);
  console.log();
  const MinimumBlogShow = () => {
    setLastSixPosts(blog?.blog?.slice(0, 6));
  };

  useEffect(() => {
    MinimumBlogShow();
  }, [blog]);
  return (
    <>
      {blog ? (
        <>
          <div className="grid grid-cols-3 gap-4 items-center px-[100px] py-[3rem]">
            {lastSixPosts?.map((items) => (
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
                    <div className="author text-[11px] font-bold text-gray-600 pt-2">
                      {items?.author?.name}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
}

export default MinBlog;
