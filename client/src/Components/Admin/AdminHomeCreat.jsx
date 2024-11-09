import React, { useContext, useEffect, useState } from "react";
import SideNav from "../Blogs/SideNav";
import { useParams } from "react-router-dom";
import AppContext from "../../State/AppContext";
import Navbar from "../Navbar/Navbar";
import { Bounce, toast } from "react-toastify";

function AdminHomeCreat() {
  const params = useParams();
  const id = params.id;
  const { FingSIngleHome, UpdateHome } = useContext(AppContext);
  const [singleHomeData, setSingleHomeData] = useState();
  const [homeText, setHomeText] = useState("");
  const [subText, setSubText] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState(null);
  const [update, setupdate] = useState(false);
  const GetHomePageSingle = async () => {
    const res = await FingSIngleHome(id);
    setHomeText(res?.home?.homeText);
    setSubText(res?.home?.subText);
    setButtonText(res?.home?.buttonText);
    setLink(res.home?.link);
    image && setImage(res?.home?.image);
    setSingleHomeData(res?.home);
  };
  const UpdateFun = () => {
    setupdate(!update);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("homeText", homeText);
    formData.append("subText", subText);
    formData.append("buttonText", buttonText);
    formData.append("link", link);
    formData.append("image", image);
    const res = await UpdateHome(formData, id);
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
      setupdate(false);
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
    GetHomePageSingle();
  }, []);
  return (
    <>
      <Navbar />
      <SideNav />
      <div className="pl-[320px] py-[4rem]">
        <h1 className="text-xl text-gray-900 font-medium py-2">
          Update Text of Home Page
        </h1>
        <form
          action=""
          onSubmit={handleSubmit}
          className="w-[650px] max-w-[100%] bg-white p-5"
        >
          {/* update heading text  */}
          <div className="my-4">
            <input
              type="text"
              value={homeText}
              onChange={(e) => setHomeText(e.target.value)}
              className="border w-full p-3 px-6 rounded-md focus:outline-none bg-gray-50 text-sm"
              placeholder="Enter the updated heading text here..."
              required={true}
              disabled={update ? false : true}
            />
          </div>
          {/* update pera  */}
          <textarea
            className="border w-full p-3 px-6 rounded-md focus:outline-none bg-gray-50 resize-none text-sm"
            placeholder="Enter the updated text here..."
            value={subText}
            onChange={(e) => setSubText(e.target.value)}
            rows="6"
            cols={8}
            required={true}
            disabled={update ? false : true}
          />
          {/* update button text  */}
          <div className="my-4">
            <input
              type="text"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              className="border w-full p-3 px-6 rounded-md focus:outline-none bg-gray-50 text-sm"
              placeholder="Enter the updated button text here..."
              required={true}
              disabled={update ? false : true}
            />
          </div>
          {/* update link button  */}
          <div className="my-4">
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="border w-full p-3 px-6 rounded-md focus:outline-none bg-gray-50 text-sm"
              placeholder="Enter the updated link button text here..."
              required={true}
              disabled={update ? false : true}
            />
          </div>
          {/* update Image   */}
          {singleHomeData?.image && (
            <>
              <label
                htmlFor="image"
                className="block w-[300px] h-[300px] object-contain "
              >
                {image ? (
                  <>
                    <img
                      src={image ? URL.createObjectURL(image) : image}
                      alt="Selected image"
                      className="w-full h-full object-contain"
                    />
                  </>
                ) : (
                  <>
                    <img
                      src={singleHomeData?.image}
                      alt="Selected image"
                      className="w-full h-full object-contain"
                    />
                  </>
                )}

                {update && (
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                )}
              </label>
            </>
          )}

          <div className="mt-4">
            {update ? (
              <>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Update text
                </button>{" "}
                <button
                  className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  onClick={UpdateFun}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <div
                  className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-[max-content]"
                  onClick={UpdateFun}
                >
                  Edite
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
}

export default AdminHomeCreat;
