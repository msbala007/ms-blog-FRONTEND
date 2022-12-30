import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
const MyBlogs = ({ blogId, title, image, description, user, date, i }) => {
  const [open, setopen] = useState(false);
  const id = localStorage.getItem("userId");
  const [mine, setuser] = useState({});
  const userBlogs = async () => {
    const res = await axios.get(
      `https://ms-blog.onrender.com/v1/blog/user/${id}`
    );

    const userData = await res.data.blogs;
    // console.log();
    setuser({ name: userData.name, photo: userData.photo });
  };
  // console.log(user.profilePic);
  useEffect(() => {
    userBlogs();
  }, []);

  return (
    <>
      <div className="p-2 " key={blogId}>
        <motion.div
          initial={{ opacity: 0, translateX: -50, translateY: -50 }}
          animate={{ opacity: 1, translateX: 0, translateY: 0 }}
          transition={{ duration: 0.3, delay: i * 0.5 }}
          // whileInView={{scaleY:2}}
          className="bg-white h-64  w-full  flex flex-row justify-around items-center 
            p-4 rounded-2xl relative shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]  "
          key={blogId}
        >
          <div className="mt-8 ">
            <img
              src={`https://ms-blog.onrender.com/img/${image}`}
              className="w-40 h-40 rounded-lg  object-cover "
            />
            <div className=" mt-6 ">
              <li className="text-xs  font-bold ">
                {" "}
                {new Date(date).toLocaleString("default", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </li>
            </div>
          </div>
          <div className="ml-4 w-80 space-y-2 ">
            <h1>{title} </h1>
            <p className="text-sm line-clamp-3">{description}</p>
            <button
              className="bg-gradient-to-r from-green-400 to-blue-500 focus:ring-1 hover:from-pink-500
                 hover:to-orange-400 hover:text-white p-2 rounded-xl text-black font-bold text-xs "
            >
              <Link to={`/blog/${blogId}`} className="">
                {" "}
                Read more...
              </Link>
            </button>
          </div>
          <div
            className="absolute h-full  right-0 p-2  flex  flex-row-reverse
                        lace-items-end "
          >
            <div className="absolute top-0 p-4 ">
              <div className="flex">
                <Link to={`/user/blog/edit/${blogId}`}>
                  <IconButton>
                    <EditIcon />
                  </IconButton>
                </Link>
                <button onClick={() => setopen(true)}>
                  {" "}
                  <IconButton>
                    <DeleteIcon />
                  </IconButton>
                </button>
                {open ? (
                  <Popup
                    close={() => setopen(false)}
                    id={blogId}
                    blog={title}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="absolute p-2 bottom-0 w-36 flex right-0 ">
              <h1 className="p-2 w-20 flex text-xs line-clamp-1">
                {mine.name}{" "}
              </h1>
              <Avatar
                src={`https://ms-blog.onrender.com/profile/${mine.photo}`}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default MyBlogs;
