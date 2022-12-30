import axios from "axios";
// import Carousel from "nuka-carousel";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Blogs from "./Blogs";
import Skeleton from "./Skeleton";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Banner from "./Banner";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import UserPosts from "./UserPosts";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import AOS from "a";
// import "aos/dist/aos.css";

const Blog = () => {
  const [blog, setpost] = useState([]);
  const [count, setCount] = useState(6);
  const [Loading, setLoading] = useState(false);
  const [user, setuser] = useState({});
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const isLogedIn = useSelector((store) => store.auth.isLogedIn);
  useEffect(() => {
    getPost();
    geUserDetails();
  }, []);
  const getPost = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://ms-blog.onrender.com/v1/blog");
      setLoading(false);
      const data = await res.data.blog;

      setpost(data);
    } catch (error) {
      console.log("ballal", error.error.Response.error);
    }
  };
  const geUserDetails = async () => {
    const res = await axios.get(`https://ms-blog.onrender.com/v1/blog/${id}`);
    const userData = await res.data.blogs;
    // console.log("{/////", userData);
    //
    // setuser({ name: userData.name, photo: userData.photo })
  };

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
    deletePost()
      .then(() => navigate("/"))
      .then(() => navigate("/myblogs"));
    // .then(() => close());
  };
  const addMore = () => {
    setCount(count + 6);
  };
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
      <div className="">
        <Banner blog={blog} />
      </div>

      <div className=" grid xl:grid-cols-3 lg:grid-cols-2 z-50 sm:grid-cols-1 h-full bg-gray-200 ">
        {blog.slice(0, count).map((a, i) => (
          <div key={a._id}>
            <Blogs
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

        {isLogedIn && (
          <div className="sticky bottom-0 flex justify-end p-8 z-30 xl:hidden lg:hidden ">
            <button
              className="bg-blue-500 sticky h-16 w-16 bg-gradient-to-tl from-green-300   s  via-transparent to-fuchsia-900 rounded-full outline-0
  shadow-[5px_5px_rgba(0,_98,_90,_0.4),_10px_10px_rgba(0,_98,_90,_0.3),_15px_15px_rgba(0,_98,_90,_0.2),_20px_20px_rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)] animate-bounce"
            >
              <Link to="/add-blogs">
                <CloudUploadOutlinedIcon />
              </Link>
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-center p-4">
        <button
          onClick={addMore}
          className="bg-black px-6 py-2 rounded-xl text-white animate-bounce   "
        >
          Loading more<span className="">.....</span>
        </button>
      </div>
    </>
  );
};

export default Blog;
