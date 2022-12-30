import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Spinner from "./Spinner";

const BlogEditAndDelete = () => {
  const [value, setValue] = useState({
    name: "",
    description: "",
  });
   const [spin, setSpin] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const getPostDetails = async () => {
    try {
      const res = await axios.get(`https://ms-blog.onrender.com/v1/blog/${id}`);
      const data = await res.data.blog;
      setValue({
        name: data.name,
        description: data.description,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Edit post

  const formData = new FormData();
  formData.append("name", value.name);
  //  formData.append("photo", image);
  formData.append("description", value.description);
  //  formData.append("nickname", user.nickname);

  const updatePostDetails = async () => {
    try {
      setSpin(true)
      const res = await axios.put(
        `https://ms-blog.onrender.com/v1/blog/post/update/${id}`,

        { name: value.name, description: value.description }
      );
      const data = await res.data.blog;
       setSpin(false);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPostDetails();
  }, [id]);

  const handleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updatePostDetails()
      .then((data) => setValue(data))
      .then(() => navigate("/blogs"));
  };
  return (
    <>
      <div className="   ">
        {spin && <Spinner />}
        <form onSubmit={handleSubmit}>
          <div className="flex  flex-col justify-evenly iems-center   min-h-screen mx-6">
            <h1 className="mx-auto text-2xl font-bold">Edit Post</h1>
            <label className="text-xl font-bold">Title</label>
            <input
              type="text"
              placeholder="name"
              name="name"
              onChange={handleChange}
              value={value.name}
              className="w-full py-2 text-black  bg-transparent  outline-none
   border-gray-500 border rounded-xl px-6"
            />

            <label className="text-xl font-bold">Description</label>
            <textarea
              type="text"
              placeholder="name"
              name="description"
              onChange={handleChange}
              value={value.description}
              rows="5"
              cols="30"
              className="w-full py-2 text-black  bg-transparent  outline-none
  border-gray-500 border rounded-xl px-6"
            />
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-green-400 to-blue-500 focus:ring-1 hover:from-pink-500 hove
               hover:text-white p-2 rounded-xl text-black font-bold text-sm w-1/2 mx-auto mt-4"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BlogEditAndDelete;
