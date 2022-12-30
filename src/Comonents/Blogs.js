import React, { useEffect, useState } from "react";
import axios from "axios";

import Skeleton from "./Skeleton";
import { Link, useNavigate } from "react-router-dom";
import Popup from "./Popup";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { motion } from "framer-motion";

const Blogs = ({ blogId, title, image, description, user, date, i }) => {
  const [blog, setpost] = useState([]);
  const [open, setopen] = useState(false);

  const [Loading, setLoading] = useState(false);

  // const [user, setuser] = useState({});
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();

  // const hyiii=date()

  // const lii=hyiii.toLocaleString("default",{day:"2-digit",month:"long",year:"numeric"})
  //  const con=hyiii.split("-")

  const deletePost = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/v1/blog/post/delete/${id}`
      );
      const data = await res.data.blog;
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const deleterequest = () => {
    // deletePost()
    // .then(() => navigate("/"))
    // .then(() => navigate("/myblogs"));
    // .then(() => close());
    // console.log("mmnxcnnn{ licked",{ii});
  };

  return (
    <>
      <div className="p-2 ">
        <motion.div key={blogId}
          initial={{ opacity: 0, translateX: -50, translateY: -50 }}
          animate={{ opacity: 1, translateX: 0, translateY: 0 }}
          transition={{ duration: 0.3, delay: i * 0.5 }}
          viewport={{ once: true }}
          // whileInView={{scaleY:2}}
          className="bg-white h-68  w-full  flex flex-row justify-around items-center 
               p-4 rounded-2xl relative shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]  "
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
          <div className="ml-4 w-52  space-y-2 ">
            <h1 className="font-bold text-xl line-clamp-1">{title} </h1>

            <p className="text-sm line-clamp-3">{description}</p>
            <button
              className="bg-gradient-to-r from-green-400 to-blue-500 focus:ring-1 hover:from-pink-500
               hover:to-orange-400 hover:text-white p-2 rounded-xl text-black font-bold text-xs "
            >
              <Link to={`/blog/${blogId}`} className="" click>
                {" "}
                Read more...
              </Link>
            </button>
          </div>

          {user.map(({ name, photo, _id }) => (
            <div
              key={_id}
              className="absolute h-full  right-0 p-2  flex  flex-row-reverse
                 place-items-end "
            >
              {id === _id && (
                <div key={_id} className="absolute top-0 p-4 ">
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
              )}

              <Avatar
              src={`https://ms-blog.onrender.com/profile/${photo}`}
              />
              <h1 className="p-2 ">{name}</h1>
            </div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Blogs;
