import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../Store/authSlice";
import MobileMenu from "./MobileMenu";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import logo from "../Assests/Icons/adventure-icon.svg";

const Header = () => {
  const isLogedIn = useSelector((store) => store.auth.isLogedIn);
  const [open, setopen] = useState(false);
  const [user, setuser] = useState({
    name: "",
    pic: "",
  });

 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(authActions.logout());
  };
  const id = localStorage.getItem("userId");
  const geUserDetails = async () => {
    const res = await axios.get(`https://ms-blog.onrender.com/user/${id}`);
    const data = await res.data.userblogs;
    setuser({
      name: data.name,
      pic: data.photo,
    });
  };
 
  useEffect(() => {
    geUserDetails();
  }, []);

 
  // return data;
  return (
    <>
      <header
        className="sticky top-0 z-30  h-16 w-full flex justify-evenhy items-center bg-gray-300 
       shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3) ] font-Anton"
      >
        <div className="flex justify-around w-full items-center xl:hidden lg:hidden font-Anton ">
          <div>
            {" "}
            <h1 className="text-2xl font-Andika cursor-pointer">
              <Link to="/" className=" flex ">
                <img src={logo} className=" w-8  object-cover " />
                <h4 className="ml-2 text-xl font-Anton">Ms Blog</h4>
              </Link>
            </h1>
          </div>
          <div className="lg:hidden xl:hidden">
            <button
              onClick={() => setopen(true)}
              className="bg-gray-200  shadow-2xl p-2 px-6 rounded-2xl  "
            >
              Menu
            </button>
            {open ? (
              <MobileMenu
                close={() => setopen(false)}
                name={user.name}
                photo={user.pic}
              />
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="flex justify-evenly xl:w-full lg:w-full sm:hidden md:hidden ">
          <h1 className="text-2xl font-bold cursor-pointer">
            <Link to="/" className=" flex ">
              <img src={logo} className=" w-8  object-cover " />
              <h4 className="ml-2 text-sm">Ms Blog</h4>
            </Link>
          </h1>
          <div className="space-x-4 sm:hidden md:hidden">
            {isLogedIn && <Link to="/myblogs">MyBlogs</Link>}
            {isLogedIn && <Link to="/blogs">Blogs</Link>}
            {isLogedIn && <Link to="/add-blogs">Add Blogs</Link>}
          </div>

          <div className="space-x-6 sm:hidden md:hidden">
            {!isLogedIn && <Link to="/login">Log in</Link>}
            {!isLogedIn && (
              <Link
                to="/signup"
                className="bg-black px-6 py-2 text-white rounded-xl"
              >
                Sign up
              </Link>
            )}
            {isLogedIn && (
              <Link to="/login" onClick={logout} className="">
                Logout
              </Link>
            )}
          </div>
        </div>
        <div className="sm:hidden md:hidden mr-4 ">
          {isLogedIn && (
            <Link to="/profile">
              <div className="flex items-center space-x-2">
                <h3 className=" line-clamp-1">{user.name}</h3>
                <Avatar
                  src={`https://ms-blog.onrender.com/profile/${user.pic}`}
                />{" "}
              </div>
            </Link>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
