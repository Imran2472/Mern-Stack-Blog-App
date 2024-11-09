import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../State/AppContext";

function Navbar() {
  const { isAuth, LogOut, user } = useContext(AppContext);
  const [Open, setOpen] = useState(false);
  const toggleMenu = () => setOpen(!Open);
  const [dropDown, setDropDown] = useState(false);
  const navigate = useNavigate();

  const handleDropdown = () => {
    setDropDown(!dropDown);
  };

  const CloseDropDown = () => {
    setDropDown(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".dropdown")) {
        CloseDropDown();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dropDown]);

  return (
    <>
      <header className="">
        <nav className="flex justify-between items-center bg-white px-[100px] max-lg:px-[30px] max-sm:px-[10px] max-sm:py-4">
          <div className="logo text-slate-800 text-xl font-medium">
            My Blogs
          </div>
          <div
            className={`max-sm:fixed max-sm:top-[50px] max-sm:h-auto max-sm:left-0 max-sm:right-0 max-sm:bg-white max-sm:w-100  max-sm:items-start max-sm:justify-start max-sm:p-5 py-4 ${
              Open ? "max-sm:flex" : "max-sm:hidden"
            }
            `}
          >
            <ul className="flex items-center gap-6 max-sm:flex-col m-0 p-0">
              <li
                className="text-slate-800 text-base font-light cursor-pointer hover:text-blue-500 "
                onClick={() => setOpen(false)}
              >
                <Link to={"/"}> Home</Link>
              </li>
              <li
                className="text-slate-800 text-base font-light cursor-pointer hover:text-blue-500 "
                onClick={() => setOpen(false)}
              >
                <Link to={"/about"}>About</Link>
              </li>
              <li
                className="text-slate-800 text-base font-light cursor-pointer hover:text-blue-500 "
                onClick={() => setOpen(false)}
              >
                Contact
              </li>
              <li
                className="text-slate-800 text-base font-light cursor-pointer hover:text-blue-500 "
                onClick={() => setOpen(false)}
              >
                <span onClick={() => navigate(`/all-blogs`)}>Blogs</span>
              </li>
              {isAuth ? (
                <>
                  <li
                    className=" dropdown text-base font-light cursor-pointer bg-blue-400 px-[25px] py-[7px] rounded-lg text-white hover:bg-blue-500"
                    onClick={handleDropdown}
                  >
                    <div className="">{user?.profile?.user.name}</div>
                  </li>
                  {dropDown && (
                    <ul className="bg-white rounded-xl border fixed top-[60px] py-4 right-[80px] max-sm:relative max-sm:left-0 max-sm:top-0 max-sm:border-none max-sm:p-0 max-sm:px-0 max-sm:w-auto">
                      <li className="text-base text-slate-800 cursor-pointer px-[2rem] max-sm:px-[8px] py-[6px] hover:bg-blue-500 hover:text-white">
                        <Link to={`/profile/${user?.profile?.user._id}`}>
                          Profile
                        </Link>
                      </li>
                      <li className="text-base text-slate-800 cursor-pointer px-[2rem] max-sm:px-[8px] py-[6px] hover:bg-blue-500 hover:text-white">
                        <Link to={"/creat-blog"}>Creat Blogs</Link>
                      </li>
                      <li
                        className="text-base text-slate-800 cursor-pointer px-[2rem] max-sm:px-[8px] py-[6px] hover:bg-blue-500 hover:text-white"
                        onClick={LogOut}
                      >
                        Logout
                      </li>
                    </ul>
                  )}
                </>
              ) : (
                <li
                  className="text-base font-light cursor-pointer bg-blue-400 px-[25px] py-[7px] rounded-lg text-white hover:bg-blue-500"
                  onClick={() => setOpen(false)}
                >
                  <Link to={"/signup"}>Creat Account</Link>
                </li>
              )}
            </ul>
          </div>
          {Open ? (
            <div
              className="menu-bar items-center gap-6 max-sm:flex hidden"
              onClick={toggleMenu}
            >
              <i className="fa-solid fa-xmark"></i>
            </div>
          ) : (
            <div className="menu-bar hidden max-sm:block" onClick={toggleMenu}>
              <i className="fa-solid fa-bars"></i>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}

export default Navbar;
