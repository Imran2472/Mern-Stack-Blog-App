import { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
const AppState = (props) => {
  // Register User
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState();
  const [reload, setReload] = useState(false);
  const [home, setHome] = useState();
  const [blog, setBlog] = useState([]);
  const [allUser, setAllUser] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
      GetProfile();
    } else {
      setIsAuth(false);
    }
  }, [localStorage.getItem("token")]);

  useEffect(() => {
    getDataHome();
    getAllBlogs();
    getAllUsers();
  }, [reload, localStorage.getItem("token")]);

  const URl = "https://mern-stack-blog-app-zeta.vercel.app/api";
  const RegisterUser = async (formData) => {
    const Response = await axios.post(`${URl}/user/register`, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
      withCredentials: true,
    });
    return Response.data;
  };

  const Login = async (email, password) => {
    const Response = await axios.post(
      `${URl}/user/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "content-type": "application/json",
        },
        withCredentials: true,
      }
    );
    localStorage.setItem("token", Response.data.token);

    setIsAuth(true);
    return Response.data;
  };

  const LogOut = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    setReload(false);
    window.location.href = "/";
    toast.success("Logout Seccessfully", {
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
  };

  const GetProfile = async () => {
    const Response = await axios.get(`${URl}/user/profile`, {
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      withCredentials: true,
    });
    setUser(Response?.data);
    return Response?.data;
  };

  const updateProfile = async (formData, id) => {
    const Response = await axios.put(
      `${URl}/user/update-profile/${id}`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
        withCredentials: true,
      }
    );
    setReload(true);
    return Response.data;
  };

  const GetUserFromId = async (id) => {
    const Response = await axios.get(`${URl}/user/getsingleprofile/${id}`, {
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      withCredentials: true,
    });
    return Response.data;
  };

  const CreatBlogs = async (blogData) => {
    const Response = await axios.post(`${URl}/blog/creat-blog`, blogData, {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: localStorage.getItem("token"),
      },
      withCredentials: true,
    });
    setReload(!reload);
    return Response.data;
  };
  // Update Blogs
  const UpdateBlog = async (formData, id) => {
    const Response = await axios.put(
      `${URl}/blog/update-blog/${id}`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
        withCredentials: true,
      }
    );
    setReload(true);
    return Response.data;
  };
  // home page updatw

  const DeletBLogs = async (id) => {
    const Response = await axios.delete(`${URl}/blog/delete-blog/${id}`, {
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      withCredentials: true,
    });
    setReload(!reload);
    if (Response?.data?.success == true) {
      toast.success(Response?.data?.message, {
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
      toast.error(Response?.data?.message, {
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
    return Response.data;
  };

  const UpdateHome = async (formData, id) => {
    const Response = await axios.put(
      `${URl}/home/update-home-page/${id}`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
        withCredentials: true,
      }
    );
    setReload(true);
    return Response.data;
  };
  const FingSIngleHome = async (id) => {
    const response = await axios.get(`${URl}/home/home-find-by-id/${id}`, {
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      withCredentials: true,
    });
    return response.data;
  };
  const getDataHome = async () => {
    const Response = await axios.get(`${URl}/home/home-page`, {
      withCredentials: true,
    });
    setHome(Response?.data);
    return Response.data;
  };

  // getall blogs
  const getAllBlogs = async () => {
    const response = await axios.get(`${URl}/blog`, {
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true,
    });
    setBlog(response?.data);
    return response.data;
  };

  const SingleBlog = async (id) => {
    const response = await axios.get(`${URl}/blog/${id}`, {
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  };

  const CreatComment = async (text, userId, blogId) => {
    const response = await axios.post(
      `${URl}/comment/post-comment`,
      { text, userId, blogId },
      {
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    return response.data;
  };

  const getComment = async (blogId) => {
    const response = await axios.get(`${URl}/comment/all-comments/${blogId}`, {
      headers: {
        "content-type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  };

  const DeletComment = async (ComentId) => {
    const response = await axios.delete(
      `${URl}/comment/delete-comment/${ComentId}`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    return response.data;
  };

  // Get All User
  const getAllUsers = async () => {
    const response = await axios.get(`${URl}/user/allusers`, {
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      withCredentials: true,
    });
    setAllUser(response?.data);
    return response.data;
  };
  const deletUser = async (Id) => {
    console.log(Id);
    const response = await axios.delete(`${URl}/user/delet-user/${Id}`, {
      headers: {
        "content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      withCredentials: true,
    });
    setReload(!reload);
    if (response?.data?.success == true) {
      toast.success(response?.data?.message, {
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
      toast.error(response?.data?.message, {
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
    return response.data;
  };

  const UpdateRole = async (role, id) => {
    const response = await axios.put(
      `${URl}/user/update-role/${id}`,
      { role },
      {
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        withCredentials: true,
      }
    );
    setReload(!reload);
    if (response?.data?.success == true) {
      toast.success(response?.data?.message, {
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
      toast.error(response?.data?.message, {
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
    return response.data;
  };
  return (
    <AppContext.Provider
      value={{
        URl,
        RegisterUser,
        Login,
        isAuth,
        setIsAuth,
        LogOut,
        user,
        updateProfile,
        GetUserFromId,
        reload,
        setReload,
        CreatBlogs,
        home,
        blog,
        SingleBlog,
        getAllBlogs,
        CreatComment,
        getComment,
        DeletComment,
        FingSIngleHome,
        UpdateHome,
        allUser,
        deletUser,
        UpdateRole,
        UpdateBlog,
        DeletBLogs,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
