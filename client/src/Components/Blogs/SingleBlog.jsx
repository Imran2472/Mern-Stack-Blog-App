import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "material-icons/iconfont/material-icons.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Rating from "@mui/material/Rating";
import AppContext from "../../State/AppContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import { Bounce, toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";

function SingleBlog() {
  const [Value, setvalue] = useState(0);
  const [rating, setrating] = useState(0);
  const [singleBlog, setSingleblog] = useState();
  const [category, setCategory] = useState("");
  const [RelatedBlog, setRelatedBlog] = useState();
  const [text, setText] = useState();
  const [userIdD, setUserId] = useState();
  const [commentss, setComment] = useState();
  const [CommentUserId, setCommentUserId] = useState();

  const { SingleBlog, blog, CreatComment, user, getComment, DeletComment } =
    useContext(AppContext);
  const [CrearAtDate, setCrearAtDate] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id;
  const singleblog = async () => {
    setUserId(user?.profile?.user?._id);
    const res = await SingleBlog(id);
    setSingleblog(res?.blog);
    setCategory(res?.blog?.category);
    setrating(res?.blog?.Rating);
    // time is show 12 format
    const date = new Date(res?.blog?.creatAt).toLocaleString("en-US", {
      hour12: true,
    });
    // change date to string
    const newDate = new Date(date).toLocaleString();
    // set date in state
    setCrearAtDate(newDate);
  };

  const addComment = async (e) => {
    e.preventDefault();
    const res = await CreatComment(text, userIdD, id);
    if (res.success == true) {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.error(res.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    setText("");
  };
  const FetchComment = async () => {
    const res = await getComment(id);
    setComment(res?.comments);
    // console.log(res?.comments);
    commentss.map((com) => {
      setCommentUserId(com?.userId?._id);
    });
  };

  const delComment = async (ComentId) => {
    const res = await DeletComment(ComentId);
    if (res.success === true) {
      toast.success(res.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.error(res.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  useEffect(() => {
    setRelatedBlog(
      blog?.blog?.filter(
        (blog) => blog?.category.toLowerCase() === category.toLowerCase()
      )
    );
    FetchComment();
  }, [commentss]);
  useEffect(() => {
    singleblog();
  }, [id]);
  return (
    <>
      <Navbar />
      {singleBlog ? (
        <>
          <div className="px-[100px] py-[3rem]">
            <div className="blog grid grid-cols-3 gap-3  items-start">
              <div className="col-span-2 bg-white p-4 rounded-lg">
                <h1 className="text-xl">{singleBlog?.title}</h1>
                <div className="creat flex items-center gap-3">
                  <span className="text-[12px] font-medium text-gray-600 my-3">
                    {CrearAtDate.split("/").join("-")}
                  </span>
                  <span className="text-[12px] font-medium text-blue-500">
                    {singleBlog?.author?.name}
                  </span>
                </div>
                <div className="image w-[100%] h-[300px] my-5">
                  <img
                    src={singleBlog?.coverImg}
                    alt=""
                    className="w-[100%] h-[100%] object-cover"
                  />
                </div>
                <div className="content ">
                  <h1 className="text-sm text-gray-900 font-medium my-2">
                    Content :
                  </h1>
                  <p className="text-gray-700 text-[13px] font-normal">
                    {" "}
                    {singleBlog?.content}
                  </p>
                </div>
                <div className="rating mt-4 flex items-center gap-4">
                  <span className="text-[13px] font-medium text-gray-800">
                    Rating :{" "}
                  </span>
                  <span className="text-[13px] font-medium text-gray-800">
                    <Rating
                      name="simple-controlled"
                      value={rating}
                      onChange={(e) => {
                        setvalue(e.target.value);
                      }}
                    />
                  </span>
                </div>
                <div className="description my-4">
                  <h1 className="text-sm text-gray-900 font-medium my-2">
                    Description :
                  </h1>
                  <p className=" text-gray-700 text-[13px] font-normal">
                    {" "}
                    {singleBlog?.description}
                  </p>
                </div>
              </div>

              <div className="related bg-white rounded-lg p-4">
                <h1 className="text-base font-medium text-gray-700">
                  Related Blogs
                </h1>

                {RelatedBlog ? (
                  <>
                    {RelatedBlog?.map((single) => (
                      <Link
                        to={`/blog/${single._id}`}
                        className="blogs my-3 flex items-center gap-4 cursor-pointer"
                        key={single._id}
                      >
                        <div className="iamge w-[800px]">
                          <img
                            src={single?.coverImg}
                            alt=""
                            className="w-[70px] h-[70px] rounded-full object-cover"
                          />
                        </div>
                        <div className="info">
                          <div className="title text-xs text-gray-600 font-normal title_wrap">
                            {single?.title}
                          </div>
                          <p
                            className="text-[10px] font-normal
               text-gray-600 title_wrap mt-1"
                          >
                            {single?.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </>
                ) : (
                  <div className="text-base mt-3 text-gray-700">
                    Loading ...
                  </div>
                )}
              </div>
            </div>

            {/* comment  */}
            <div className="comments rounded-lg  my-4 grid grid-cols-3">
              <div className="col-span-2 bg-white p-4">
                <h1 className="text-base font-medium text-gray-700">
                  Comments ({commentss?.length})
                </h1>

                {commentss?.map((commentData) => (
                  <div className="flex justify-between items-center">
                    <div
                      className="comment flex items-center gap-4 my-4"
                      key={commentData?._id}
                    >
                      <div className="image">
                        <img
                          src={commentData?.userId?.image}
                          alt=""
                          className="w-[35px] h-[35px] object-cover rounded-full"
                        />
                      </div>
                      <div className="comment-info">
                        <div className="text text-[12px] font-medium text-gray-800">
                          {commentData?.text}
                        </div>
                        <div className="author text-[10px] font-normal text-gray-500">
                          {commentData?.userId?.name}
                        </div>
                      </div>
                    </div>
                    {userIdD === CommentUserId && (
                      <div
                        className="delete "
                        onClick={() => delComment(commentData?._id)}
                      >
                        <DeleteIcon
                          fontSize="10px"
                          className="cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                ))}
                <h1 className="text-sm font-medium text-gray-700 mt-5">
                  Leave a comment
                </h1>
                <form action="" onSubmit={addComment}>
                  <div className="flex items-center my-5">
                    <textarea
                      rows="6"
                      className="border w-full p-5 rounded-md focus:outline-none bg-gray-50 resize-none text-sm"
                      placeholder="Share your opinion about this post here ..."
                      required={true}
                      name="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="flex items-center mt-4">
                    <button
                      type="submit"
                      className="text-white bg-blue-500 hover:bg
                  font-normal text-sm rounded-md px-8 py-2 w-[100%]"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
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

export default SingleBlog;
