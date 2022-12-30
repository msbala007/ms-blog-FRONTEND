import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link  } from "react-router-dom";
import Skeleton from "./Skeleton";
// import AddIcon from "@mui/icons-material/Add";
// import Avatar from "@mui/material/Avatar";
// import Popup from "./Popup";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import { motion } from "framer-motion";
import MyBlogs from "./MyBlogs";

// import { EditIcon } from "@mui/icons-material/EditIcon";
// import { FaBeer } from 'react-icons/fa';

const UserPosts = () => {
  const [Blog, setBlog] = useState([]);
  const [user, setuser] = useState([]);
  const [Loading, setLoading] = useState(false);

  // const [open, setopen] = useState(false);

  const id = localStorage.getItem("userId");
  const userBlogs = async () => {
    setLoading(true);
    const res = await axios.get(
      `https://ms-blog.onrender.com/v1/blog/user/${id}`
    );
    setLoading(false);
    const data = await res.data.blogs.blogs;
    const userData = await res.data.blogs;

    // console.log();
    setuser({ name: userData.name, photo: userData.photo });
    setBlog(data);
  };
  // console.log(user.profilePic);
  useEffect(() => {
    userBlogs();
  }, []);

  if (Blog.length === 0) {
    return (
      <div className="flex flex-col justify-evenly items-center h-screen">
        <h1 className="text-2xl  font-extrabold text-center">
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

      <div className="xl:grid grid-cols-3 h-full w-full lg:grid lg:grid-cols-2 ">
        {Blog.map((a, i) => (
          <div key={a._id}>
            <MyBlogs
              blogId={a._id}
              title={a.name}
              iddd={a._id}
              image={a.image}
              description={a.description}
              user={a.user}
              blog={a.blog}
              date={a.createdAt}
              i={i}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default UserPosts;
