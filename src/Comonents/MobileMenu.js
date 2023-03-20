import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { authActions } from "../Store/authSlice";
import Avatar from "@mui/material/Avatar";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { motion } from "framer-motion";

const MobileMenu = ({ close, name, photo }) => {
  const isLogedIn = useSelector((store) => store.auth.isLogedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(authActions.logout());
  };
  return (
    <>
      <motion.div className="fixed z-30 inset-0 top-0 l-0 h-screen backdrop-blur-sm bg-gray-500 bg-opacity-60 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
          className="fixed inset-0 top-0 l-0 p-5    "
        >
          <div className="bg-white w-full rounded-xl p-5 ">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">MS BLOG</h1>
              <div className="flex justify-center items-center">
                <h6 className="mr-2 line-clamp-1 w-20">{name}</h6>
                {isLogedIn && (
                  <Avatar
                    src={`${process.env.URL}/profile/${photo}`}
                    className="mr-2"
                  />
                )}

                <button onClick={close}>
                  <IconButton>
                    <ClearIcon />
                  </IconButton>
                </button>
              </div>
            </div>
            <div className=" mt-2">
              <div
                onClick={close}
                className="flex flex-col space-y-1 py-2 z-0 divide-y-2 "
              >
                {isLogedIn && (
                  <Link to="/myblogs" className="nav z-20 cursor-pointer">
                    MyBlogs
                  </Link>
                )}
                {isLogedIn && (
                  <Link to="/blogs" className="nav">
                    Blogs
                  </Link>
                )}
                {isLogedIn && (
                  <Link to="/add-blogs" className="nav">
                    Add Blogs
                  </Link>
                )}{" "}
                {isLogedIn && (
                  <Link to="/profile" className="nav">
                    Profile
                  </Link>
                )}
                {isLogedIn && (
                  <Link to="/login" onClick={logout} className="nav">
                    Logout
                  </Link>
                )}
                {!isLogedIn && (
                  <Link to="/login" className="nav text-xl">
                    Log in
                  </Link>
                )}{" "}
                <br />
                {!isLogedIn && (
                  <Link to="/signup" className="nav text-xl">
                    Sign up
                  </Link>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default MobileMenu;
