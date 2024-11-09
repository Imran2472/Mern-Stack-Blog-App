import React, { useContext, useEffect, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import { useNavigate } from "react-router-dom";
import AppContext from "../../State/AppContext";
function SideNav() {
  const { FingSIngleHome, home, user } = useContext(AppContext);
  const [homeId, setHomeId] = useState();
  const [activeIndex, setActiveIndex] = useState();
  const navigate = useNavigate();
  const handleClick = (index) => {
    setActiveIndex(index);
  };
  // console.log(home?.home?.map((item) => item._id));
  const HomeSingleId = () => {
    home?.home?.map((item) => {
      setHomeId(item._id);
    });
  };
  useEffect(() => {
    HomeSingleId();
  }, []);
  console.log(user?.profile?.user?.role);
  return (
    <div className="w-[300px] max-w-[100%] bg-white fixed top-0 left-0 bottom-0">
      <div className="text-slate-800 text-xl font-medium p-6 px-[50px] border-b">
        My Blogs
      </div>
      <ul className="pt-[3rem] px-[10px]">
        <li
          className={`py-[10px] px-[20px] text-base font-medium text-slate-950 flex items-center gap-7 hover:bg-blue-300 rounded-lg hover:text-white cursor-pointer ${
            activeIndex === 0 ? "bg-blue-300 text-white" : ""
          }`}
          onClick={() => handleClick(activeIndex ? activeIndex : 0)}
        >
          <div>
            <DashboardIcon fontSize="small" />
          </div>
          <div className="icon text-sm ">Dashboard</div>
        </li>

        <li
          className={`py-[10px] px-[20px] text-base font-medium text-slate-950 flex items-center gap-7 hover:bg-blue-300 rounded-lg hover:text-white cursor-pointer ${
            activeIndex === 1 ? "bg-blue-300 text-white" : ""
          }`}
          onClick={() => {
            handleClick(activeIndex ? activeIndex : 1);
            navigate("/creat-blogs");
          }}
        >
          <div>
            <AddIcon fontSize="small" />
          </div>
          <div className="icon text-sm ">Creat a Blog</div>
        </li>

        {user?.profile?.user?.role === "admin" && (
          <li
            className={`py-[10px] px-[20px] text-base font-medium text-slate-950 flex items-center gap-7 hover:bg-blue-300 rounded-lg hover:text-white cursor-pointer ${
              activeIndex === 2 ? "bg-blue-300 text-white" : ""
            }`}
            onClick={() => {
              handleClick(0);
              navigate(`/update-page-text/${homeId}`);
            }}
          >
            <div>
              <HomeIcon fontSize="small" />
            </div>
            <div className="icon text-sm">Home Page Update</div>
          </li>
        )}

        {user?.profile?.user?.role === "admin" && (
          <li
            className={`py-[10px] px-[20px] text-base font-medium text-slate-950 flex items-center gap-7 hover:bg-blue-300 rounded-lg hover:text-white cursor-pointer ${
              activeIndex === 3 ? "bg-blue-300 text-white" : ""
            }`}
            onClick={() => {
              handleClick(3);
              navigate(`/all-users`);
            }}
          >
            <div>
              <GroupIcon fontSize="small" />
            </div>
            <div className="icon text-sm ">Users</div>
          </li>
        )}

        {user?.profile?.user?.role === "admin" && (
          <li
            className={`py-[10px] px-[20px] text-base font-medium text-slate-950 flex items-center gap-7 hover:bg-blue-300 rounded-lg hover:text-white cursor-pointer ${
              activeIndex === 4 ? "bg-blue-300 text-white" : ""
            }`}
            onClick={() => handleClick(4)}
          >
            <div>
              <BorderAllIcon fontSize="small" />
            </div>
            <div
              className="icon text-sm"
              onClick={() => navigate("/admin-blogs-all")}
            >
              All Blogs
            </div>
          </li>
        )}

        <li
          className={`py-[10px] px-[20px] text-base font-medium text-slate-950 flex items-center gap-7 hover:bg-blue-300 rounded-lg hover:text-white cursor-pointer ${
            activeIndex === 4 ? "bg-blue-300 text-white" : ""
          }`}
          onClick={() => handleClick(4)}
        >
          <div>
            <BorderAllIcon fontSize="small" />
          </div>
          <div className="icon text-sm" onClick={() => navigate("/my-blogs")}>
            My Blogs
          </div>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;
