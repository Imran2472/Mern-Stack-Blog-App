import React, { useContext, useEffect, useState } from "react";
import SideNav from "../Blogs/SideNav";
import AppContext from "../../State/AppContext";
import Navbar from "../Navbar/Navbar";
function User() {
  const { allUser, deletUser, UpdateRole } = useContext(AppContext);
  return (
    <div>
      <Navbar />
      <SideNav />
      <div className="pl-[320px] py-[4rem]">
        <div className="bg-white p-5 w-[600px] max-w-[100%] rounded-lg">
          <h1 className="text-gray-900 text-xl font-medium">All User</h1>
          {/* user profile img an name and email and delet button show  */}
          {allUser?.user?.map((user) => (
            <div key={user._id} className="py-4">
              <div className="flex gap-3 items-center justify-between">
                <div className="flex gap-6 items-center">
                  <img
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    src={user.image}
                    alt="User"
                  />
                  <div className="flex flex-col">
                    <h2 className="text-gray-800 text-sm font-medium">
                      {user.name}
                    </h2>
                    <span className="text-gray-500 text-xs">{user.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {/* update role  */}
                  {user?.role === "admin" ? (
                    <div className="flex gap-2 items-center">
                      <span className="text-gray-500 text-xs">Role: Admin</span>
                      <button
                        className="text-sm text-blue-500"
                        onClick={() => UpdateRole("user", user?._id)}
                      >
                        Admin
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <span className="text-gray-500 text-xs">Role: User</span>
                      <button
                        className="text-sm text-blue-500"
                        onClick={() => UpdateRole("admin", user?._id)}
                      >
                        User
                      </button>
                    </div>
                  )}
                  {/* delete user  */}
                  <button
                    className="text-sm text-red-500"
                    onClick={() => deletUser(user?._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default User;
