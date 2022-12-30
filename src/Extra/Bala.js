import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "./Skeleton";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import Popup from "./Popup";

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
    const userData = await res.data.blogs;

   
    // setuser({ name: userData.name, photo: userData.photo });
    setBlog(data);
  };
   console.log(Blog);
  // console.log(user.profilePic);
  useEffect(() => {
    userBlogs();
  }, []);

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
    <div className="">
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
        <div className="xl:grid grid-cols-3 h-full w-full lg:grid lg:grid-cols-2">
          {Blog.map(({ _id, image, name, description }) => (
            <div className="p-2 bg-gray-700">
              <div className="bg-white h-60  w-full  flex flex-row justify-around items-center p-4 rounded-2xl relative ">
                <div className=" ">
                  {/* <Link to={`/user/blog/edit/${a._id}`}>Edit</Link> */}
                  <button onClick={() => setopen(true)}>Delete</button>
                  <img
                    src={`http://localhost:5000/img/${image}`}
                    className="w-40 h-40 rounded-lg  "
                  />
                </div>
                <div className="ml-4 w-80 space-y-2 ">
                  <h1>{_id}</h1>
                  <button>
                    {" "}
                    <Link to={`/user/blog/edit/${_id}`}>
                      {" "}
                      <AddIcon />
                    </Link>
                    <Avatar src={`http://localhost:5000/img/${image}`} />
                  </button>
                  <p className="text-sm">{description}</p>
                  <button className=" m-center bg-orange-600 p-2 rounded-full text-white">
                    READ MORE...
                  </button>
                </div>
                <div className="absolute h-full  right-0 p-2  flex  flex-row-reverse  place-items-end ">
                  <Avatar
                    src={`http://localhost:5000/img/${user.profilePic}`}
                  />
                  <h1 className="p-2">{user.name}</h1>
                  {open ? (
                    <Popup close={() => setopen(false)} id={_id} />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    </div>
  );
};

export default UserPosts;
