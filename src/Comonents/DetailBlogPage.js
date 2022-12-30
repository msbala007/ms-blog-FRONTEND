import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Popup from "./Popup";
const DetailBlogPage = () => {
  const [blogs, setblogs] = useState([]);
  const [user, setuser] = useState([]);
  const { id } = useParams();
  const [open, setopen] = useState(false);

  const localId = localStorage.getItem("userId");

  const userBlogs = async () => {
    try {
      const res = await axios.get(`https://ms-blog.onrender.com/v1/blog/${id}`);
      const data = await res.data.blog;
      // console.log("{gtgdagdagta", res.data.blog);
      setblogs({
        name: data.name,
        description: data.description,
        image: data.image,
        date: data.createdAt,
        id:data._id
      });
      setuser(data.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userBlogs();
  }, [id]);

  // const some = Object.values(user);
  // console.log("{sahydhyachyjsjcjsjc", some);
  return (
    <>
      <div className="mt-4 ">
        {user?.map(({ name, photo, _id }) => (
          <div className="flex items-center  flex-end ml-2" key={_id}>
            <Avatar src={`https://ms-blog.onrender.com/profile/${photo}`} />
            <h2 className="ml-4">{name}</h2>
          </div>
        ))}
      </div>
      <div className="flex justify-evenly flex-col items-center min-h-screen  space-y-4 mt-2 " key={blogs-id}>
        <div className="">
          <h1 className="text-2xl font-bold">{blogs.name}</h1>
        </div>
        <div className=" xl:p-12 w-full md:  ">
          <img
            src={`https://ms-blog.onrender.com/img/${blogs.image}`}
            alt=""
            className=" w-full sm:h-64 md:h-76 xl:h-1/2 object-cover rounded-xl sm:p-2 md:p-4  lg:p-6 "
          />
        </div>
        <div>
          <p className="text-justify leading-6 text-sm mx-2 font-Antika">
            {blogs.description}
          </p>
          <div className="p-4">
            <h4 className="flex justify-center  ">
              Publised on{" "}
              <span className="ml-2 text-sm  font-bold mt-1">
                {" "}
                {new Date(blogs.date).toLocaleString("default", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </h4>
          </div>
        </div>
      </div>
      {/* {user.map(({ name }) => ( */}
      {/* // <div>{name}</div> */}
      {/* // ))} */}
    </>
  );
};

export default DetailBlogPage;
