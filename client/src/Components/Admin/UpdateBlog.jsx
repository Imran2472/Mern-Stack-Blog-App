import { useContext, useEffect, useState } from "react";
import AppContext from "../../State/AppContext";
import { Bounce, toast } from "react-toastify";
import Navbar from "../Navbar/Navbar";
import SideNav from "../Blogs/SideNav";
import { useParams } from "react-router-dom";

function UpdateBlog() {
  const [dummmy, setDummy] = useState(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQsAAAC9CAMAAACTb6i8AAAAkFBMVEX///8jHyAAAAD8/PwlISIhHR4RCgySkJENCgyNjY2lo6QUDhAkHyB8env+//4iHx8dGRoJAAAZFRYiHB6HhYZFQ0Tx8fEcGhtlY2RraWrT0dIoJic/PT7Z2dnIx8jj4eK2tLVcWlucmpvMysu/vb7q6upSUFFycnKrqKkzMTLf3d5dW1w6ODk4OTkaGxtIR0jxrFaFAAAM2klEQVR4nO1dCXfbrBIVmyJbsgVYXuVFVrwp8ff6///dYwBvadKIWLXjlNse9ySWEFwNw8wwQ4PAw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw+PfAwHcuxP3gR42DJ4MXop2qzMeLTfL0bjTKlcvA6KpCf4ZamCgZF1kG4YxDuNYci6ljIX6iW2yYq2//yfoAImYlX2MI44YpYgmCCH1T4oQQ2wYY9wvX4J/googGJT/YcEYAvR6Sc8iSagC8MIF3rcH9+7mXwcJZmMccoqOSFP9Sc2vUvtbjvF4pq7vGjn6adAaYLLEMkEnKlJkSLBUnH2DYvw6+al6Q41pMY7k2ctHl+OnF18oDSLF+OXevf5LIE//iykDTZkcBsx4HGILEcb8ggr1Jxo+/Tix6Kp5/9zH5r3rOUIRkwLnm22rXayeJ88rZWlsNzkWkllZ0Rcz3J9olfFzKCFq8QilVQrABItxNSon68shkvWkHFU4Zoop9ddo0bAkP0l/kmA9wgcFSRnlOB+v1vqLM+Vo/12vxrkYUsMESnoJHq1/kFgEsyoGq8qIhRTT9lqTQN5ZJ+DHdXuPubk8SXo0/G92l17/BZBgBVqRKoFIGGV4uvrsLSuCVlNljlFNBUJDuQp+giWqXv4OMz03lLlNRV7UvLHII0VGT6/BHBc/QWeQoI2PKyXHTzUVISwdLcyN2lCfuP0TyFBUGHuCUjydWSXxKbQemU3xcenBu8eeJMqqCApsVlGgInOwE/SlJMNqhiRwewLT5C/29a+DBBOsLE3tmjO8cr6bKCqZ1hkoZXj22I7aWi0eoPyU+kMT57th5BMkrVXO8/Vf6OHNQDbcKL9UVkpVdB3v1mxMKmm0DY2Xj2yLP9klJJX7L3qcioyZJkPZ5Al+arZ7N4N6g3OsdaYyuqsvW44gGTlP9FKU4nmTPbwdCBnsJTVOCH/+snDDtHiWxlGjcjoIHtAAVe8zE2AqqUXkquUQ7iysnYHULHk4JnRkM9LzgyKcXUUF7Jdk2DhqKJo9IBmELKVxuvnGdQF5p7GNhJAGQvL1EdcSrTghiiWuDlqCOS7MRgpS6vPhuDiaFk04EmqWlJhq+1NuHo6KYCVSre/4r+v7rnVGn5t1VTyWYIB6WMawK6jEoqmuz63dJl8bae5WADcihM0wRuWyIXuABButixmNHyri1yVBB4LZiVpPJw0F9JXFhc0udJQ10NzN0A0G6v3BGsh/NbULqCjt670kOswfQ18cernC2hxIxaopRaeaKWBdhXjf6hG2WY+hlrEJOrC0sT6DA8+GqNdTvvvW/qZeuPA+0Ak1s1W71TFZBTRsNdp6FtMEomQya+1Ws2Ou0/fEpPwVYYyj2NhFLHSPZX0M5bxHTMc+aRwK9ZRN2WTzjWJR7kXImd4h1/EGyvYNyjC0tGdJYpMU1IcMcVV+t7hfV3X0pSOjs5wBjcZXv05MLx5AmeCdF5MV2fCjvgjVj7Vi4pAscOgnQs2tIhYrcUk2JHjFMlt/H71BSFFF2qOmF1QgumiYi0XK0FsoR7gqvo1crLd4iGys5ZwJ3Gn4QSTY4jQ5Sp9+COollOPtd1AbEKfeh8f8AFjyuIyFiKIIj2rmJZK6ySYkGIywAIRyiKgRRU1LqHcn7y4bc6UyTRqW9iIF34+ycrcrn+rGrDUVtQYCV87Lst0uW697qdOZDvl/UsLj7kzGCvcoYrnOKuAiHheL41f1907X9STjgrFFMY4PKbNKTzEIDtyXi2dsd44hzyw/y9YltWWWZAJHWb1JchIg+By0e7h3WF1TfE/LS7nmM8z1FojymKJo53i/GdgiF4z2RLX40sK4wxEym88U4fvpDEXFesh1Vh7kR2wHjt6jkRxI2oGdAwZxUdeRqOsHYwxxEi0a+fp+KoMsYwQjyRGLdiYZrX5X9LWDregd9B/uOL9Uff3OWnm9JH69X/pjiXVqP2U8f3Z3oSHS3w/VKpxqA5JR0XfdPTCiNafSrOgUtx0baAQw8pfYmjs8dw5BauaKVFoTwWQEc1YEMPec5tph8xkmCpMv9xELMpbaIUCMOW8dw2gHWXRpUVPGRDboumoNdfkzV+an9gbHbv1oCnNhxUI4bx3DaF82gtFLKhSxYvMSuE16fandfFbz7A5ZCaq/er8Uup85Z9xAItZQnqzVMzZk6hrNJGbzWW9YJrDfens8R6Yohu1dy6Fsgh7kvgIONKBEywnDmfPSGpDBfqi1eNJoKK3u47exXQrd0/OC9VTYLFal/PX2GkopP9QR4P7aPTqzwkgnrOjA8I1lY5EbP11uXO8kqt/clNmp3ktpxSJk6FCHJoFfNy5gW00LBhhct54mVltR/Ox6J8wPrSf17ePMkBFnI5wbLxy22zInuSAmOUzHWnHh2qGrMTIFQHLqchOo2MWv0NgUasgcl8FTqAUkfgqeMNMKpAeJsZvFp62dAcioTNFJfPNldVDBO6Q0KuveYV3MAkmjchUVYaWEKgMuUhQ9KXWch8qSNmm+MtfBUocFqoy0GubVrUtbJ5GJb+Lar09TQZR9Bea2tjOhYCgIWlouNBem/Cg1XicPXdLHFV5sgls0ubHCMOpCuWW1dZz2z5favsrVckp5ZArJzrhQPz9FNnSq2g6XTvMksCWdN1cYWaQlXW5d3sEql8j6+DSsVmYCnLjo6oKiSq/VoDZonDus1yQYa+/m1jkJ3eBV6tpKUT9+o5dSozVpmuDXhdUF53MErlq8RraCFXTrysFYaJuiTzlyHM21mHJd1uGQgUSCoTGvQF/gUw3uGy5gnmBuvQuG0to9ItrcUhj2nUZyPSpmuHCweBc4tbYUh/yzwwrxOxfBPLQpC8pacFAZE8NFWtW/pQmQnEHAIBEOJ1UsrHWWaBv7uFhecGEDQuu+0HOEOXEx0zV+SOnzm4IoYxfsAPHioDsphPOUGXWZlHEpF6Z1pZuxtl9gXLUfMItSy8VN11SS97R+E7PafVWijyVjIX2z4fwOF3DBisfKWcHPDg78zMyRW8tFUOmSDpc9CYjFLYd5Z/0m3P0eF4D1Nk9fJy4u2rPVnfvadzSDPte2soPDTnSYYUDeGtbvcwEHosDFLqbnyigk+evGdudI6lT18PrA80dy4Y5SaC7iW9sXrQhZu+bad9AcF6/GLGmgJTcof0R7m/HVLTXHRWTMF+dA27WY2arR6zd0G+Nickiev3XpEanYYQhXPrgxLp5COEqBsf3Nk4LHsXGR6zsMH6ARLmC9gWJFyP3cXtsjZ6wO8c7iyoaa4ALiRIWOoqbo5rtFJBhUOuhC+f47zBElFhXKuSKDQYjvxvrCRnN03sRVD2+Ii52pTEBhdl13vvTwmdRx/YQla/c9xDM0ozsXw8MhAneoOiLBVupwHZPjqxR3M3JhtigouoPm1IIRmzAVwrX3Bd5DI1yUODGx6Pj2J/hpn6kT6n3QFIXFFU01wUURJoYLcU25+DVY57ZkBsUrRc4XdcZVXBhHtohtXv6wulsu9OH4AdYLv16cfKVcQCqgsCdPUaewecPoHGoYGM6+2otruCAmlcNUujOYIfdCNyBTWz+LkKi+qLWu4gKO+hOmoAtR2b9feaJ68lpymzShjK7Ooabl0KVul3QVzjTJOxG797kgb84kI8FZu6emFh18LGa66zlLujPHA+aUoYE7E/tF99j3i9G/F7L7gAvNRtdc3rUPO9DTDcwDJtvIhLJSnYTttvvaMKA/L0NTTay3M+Kon80Xf5TTmlx8pn3IYt6aRvKQ0kI543c9G9i89Nk0tHKhbFDGoyjvL8cdg1bRfmplWeeIbO4gF/PTjVmWtcp20bI/jpfTXEScJT2jNimNp4u7l48ENmkC0VOxGZcyNgiFCBXiI0Kd9P3p/giAdMT5jQri9AsJ6ZAJgsM9ewlLmUnluPYomgZASinPT/Z+i/T4AelUby2Rj7g4O+ryDL8/JkGplOX966sOmGzE+Vnw1OLiB/sbvqnJxa/h5a2HBim95IMOxWbyTYoyzXbwrhK/l0v+/lYZ5dNBnTkCyauft6fruqoddOEbzI8jBrsK65nyJ0pSkw9aS19sZPJBU6n1gigs41V7cFrEvw3IfBThmCP6se6A8qG3ifQfrSMFuOH0XToUSXAORozx6FseiqztoMEq6+M/o3w7sz+yO4Pyk5b6rfngffPtzjh1SVlBxa79AXa/WwEfyYWyaT9upjhadN+NCEfUW0fqN/XgdJyhuf3Ux4fn4gTPxQmeixM8Fyd4Lk7wXJzgubBQZlIZgpeViLuUon8rwBEaUA+A8E/9r8wcAD5YNIxw+1tFIO4EQubb5Xbe9VQY/BzvysPDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDBf8HAiSgQyRy00sAAAAASUVORK5CYII="
  );
  const [singleBlogAdmin, setSingleBlogAdmin] = useState();
  const { SingleBlog } = useContext(AppContext);
  const params = useParams();
  const id = params.id;
  const { UpdateBlog } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [coverImg, setCoverImg] = useState(null);
  const [category, setCategory] = useState("");
  const [Rating, setRating] = useState(0);
  const [image, setImage] = useState(null);

  const GetSingleDataBLogs = async () => {
    const res = await SingleBlog(id);
    setSingleBlogAdmin(res?.blog);
    setTitle(res?.blog?.title);
    setDescription(res?.blog?.description);
    setContent(res?.blog?.content);
    coverImg && setCoverImg(res?.blog?.coverImg);
    setImage(res?.blog?.coverImg);
    setCategory(res?.blog?.category);
    setRating(res?.blog?.Rating);
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const blogData = new FormData();
    blogData.append("title", title);
    blogData.append("description", description);
    blogData.append("content", content);
    blogData.append("coverImg", coverImg);
    blogData.append("category", category);
    blogData.append("Rating", Rating);

    const res = await UpdateBlog(blogData, id);
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
  };

  useEffect(() => {
    GetSingleDataBLogs();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="side">
        <SideNav />
      </div>
      <div className="pl-[320px] py-[3rem]">
        <h1 className="text-xl font-medium text-gray-800 my-3">
          Update A Blog
        </h1>
        <form
          action=""
          className="bg-white p-6 rounded-lg max-w-3xl"
          onSubmit={HandleSubmit}
        >
          {/* Form fields */}
          <div className="mb-6">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="mt-1 block w-full px-3 py-2 text-sm text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 w-[100%]">
            {/* category */}
            <div className="mb-6 w-[100%]">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="category"
              >
                category
              </label>
              <select
                className="mt-1 block w-full px-3 py-2 text-sm text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                type="text"
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="information">information</option>
                <option value="technalogies">technalogies</option>
                <option value="it">it</option>
                <option value="world">world</option>
                <option value="computer">computer</option>
              </select>
            </div>

            {/* content */}
            <div className="mb-6 w-[100%]">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="Rating"
              >
                Rating
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 text-sm text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                type="number"
                id="Rating"
                name="Rating"
                value={Rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
          </div>
          {/* description */}
          <div className="flex items-center gap-4">
            <div className="mb-6 w-[100%]">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="mt-1 block w-full px-3 py-2 text-sm text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                type="text"
                id="description"
                name="description"
                rows={8}
                cols={8}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            {/* content */}
            <div className="mb-6 w-[100%]">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="content"
              >
                Content
              </label>
              <textarea
                className="mt-1 block w-full px-3 py-2 text-sm text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500"
                type="text"
                id="content"
                name="content"
                rows={8}
                cols={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* coverImg */}
          <div className="mb-6">
            <label
              className="text-sm font-medium text-gray-700 border border-blue-500 w-[100%] p-5 rounded-lg flex flex-col justify-center items-center"
              htmlFor="coverImg"
            >
              {coverImg ? coverImg.name : image}
              {coverImg ? (
                <img
                  src={coverImg ? URL.createObjectURL(coverImg) : coverImg}
                  alt="cover image"
                  className="w-[100%] h-[300px] object-cover object-top-bottom"
                />
              ) : (
                <img
                  src={image}
                  alt=""
                  className="w-[100%] h-[300px] object-cover"
                />
              )}
            </label>
            <input
              className="mt-1 w-full px-3 py-2 text-sm text-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 hidden"
              type="file"
              id="coverImg"
              name="coverImg"
              onChange={(e) => setCoverImg(e.target.files[0])}
            />
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="block w-full px-4 py-3 text-sm text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 mt-3"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateBlog;
