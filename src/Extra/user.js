import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "./Skeleton";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import Popup from "./Popup";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { motion } from "framer-motion";

// import { EditIcon } from "@mui/icons-material/EditIcon";
// import { FaBeer } from 'react-icons/fa';

const UserPosts = ({ name }) => {
  const [Blog, setBlog] = useState([]);
  const [user, setuser] = useState([]);
  const [Loading, setLoading] = useState(false);

  const [open, setopen] = useState(false);

  const id = localStorage.getItem("userId");
  const userBlogs = async () => {
    setLoading(true);
    const res = await axios.get(`http://localhost:5000/v1/blog/user/${id}`);
    setLoading(false);
    const data = await res.data.blogs.blogs;
    // const userData = await res.data.blogs;

    // console.log();
    // setuser({ name: userData.name, photo: userData.photo });
    setBlog(data);
  };
  // console.log(user.profilePic);
  useEffect(() => {
    userBlogs();
  }, []);

  const deletePost = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/v1/blog/post/delete/6392f0f758f4bd24821d2e27`
      );
    } catch (error) {}
  };

  if (Blog.length === 0) {
    return (
      <div className="flex flex-col justify-evenly items-center h-screen">
        <h1 className="text-2xl  font-extrabold">
          You don't have any blogs right now{" "}
        </h1>
        <button className="bg-black text-white w-44 p-4 rounded-xl">
          <Link to="/add-blogs">Add</Link>
        </button>
      </div>
    );
  }
  return (
    <>
      <div>
        {Loading && (
          <div className="xl:grid grid-cols-3 h-full w-full lg:grid lg:grid-cols-2">
            {" "}
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        )}
      </div>
      <div className="p-2">
        <div className="xl:grid grid-cols-3 h-full w-full lg:grid lg:grid-cols-2 ">
          {Blog.map((a, i) => (
            <div className="p-2">
              <motion.div
                initial={{ opacity: 0, translateX: -50, translateY: -50 }}
                animate={{ opacity: 1, translateX: 0, translateY: 0 }}
                transition={{ duration: 0.3, delay: i * 0.5 }}
                // whileInView={{scaleY:2}}
                className="bg-white h-64  w-full  flex flex-row justify-around items-center 
       p-4 rounded-2xl relative shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]  "
              >
                <div className="mt-8 ">
                  <img
                    src={`http://localhost:5000/img/${a.image}`}
                    className="w-40 h-40 rounded-lg  object-cover "
                  />
                  <div className=" mt-6 ">
                    <li className="text-xs  font-bold ">
                      {" "}
                      {new Date(a.createdAt).toLocaleString("default", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </li>
                  </div>
                </div>
                <div className="ml-4 w-80 space-y-2 ">
                  <h1>{a.name} </h1>
                  <p className="text-sm line-clamp-3">{a.description}</p>
                  <button
                    className="bg-gradient-to-r from-green-400 to-blue-500 focus:ring-1 hover:from-pink-500
      hover:to-orange-400 hover:text-white p-2 rounded-xl text-black font-bold text-xs "
                  >
                    <Link to={`/blog/${a._id}`} className="">
                      {" "}
                      Read more...
                    </Link>
                  </button>
                </div>

                <div
                  className="absolute h-full  right-0 p-2  flex  flex-row-reverse
    place-items-end "
                >
                  <div className="absolute top-0 p-4 ">
                    <div className="flex">
                      <Link to={`/user/blog/edit/${a._id}`}>
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
                          id={a._id}
                          blog={a.name}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>

                  {/* <Avatar src={`http://localhost:5000/profile/${photo}`} /> */}
                  {/* <h1 className="p-2 ">{name}</h1> */}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserPosts;
