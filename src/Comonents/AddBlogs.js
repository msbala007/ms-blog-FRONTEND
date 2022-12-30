import React, { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Spinner from "./Spinner";

const AddBlogs = () => {
  const [value, setValue] = useState({
    name: "",
    description: "",
  });

  const getFile = useRef();
  const [image, setimage] = useState();

  const [spin, setSpin] = useState(false);

  const id = localStorage.getItem("userId");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const formData = new FormData();
  formData.append("name", value.name);
  formData.append("image", image);
  formData.append("user", id);
  formData.append("description", value.description);

 
  const createPost = async () => {
   setSpin(true)
    const res = await axios.post(
      "https://ms-blog.onrender.com/v1/blog/post",
      formData
      // {
      // mode: "cors",
      // headers: {
      // "Access-Control-Allow-Origin": "*",
      // "Content-Type": "application/json",
      // "Access-Control-Allow-Methods": "POST,GET,PUT",
      // },
      // }
    );
  
    const data = await res.blog;
   setSpin(false);
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost().then(() => navigate("/blogs"));
  };

  return (
    <>
      <div>{spin && <Spinner />}</div>
      <div className="min-h-screen w-full p-6 ">
        <form onSubmit={handleSubmit} className="  ">
          <div className="min-h-screen flex  flex-col justify-evenly xl:space-y-2 lg:space-y-2">
            <h1 className="flex justify-center mb-8">Add Posts</h1>

            <div className="w-full">
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  className="w-full h-52 rounded-lg  object-cover xl:h-96 lg:h-96 "
                />
              )}
              {/* <Spinner /> */}

              <button
                onClick={(e) => {
                  e.preventDefault();
                  getFile.current.click();
                }}
                className="mx-center w-full"
              >
                <CloudUploadOutlinedIcon fontSize="large" />{" "}
                <h2 className="">Select Image </h2>
              </button>
            </div>

            <label className="text-2xl font-bold">Title</label>
            <input
              type="text"
              placeholder="Title"
              name="name"
              onChange={handleChange}
              value={value.name}
              className="w-full py-2 text-black  bg-transparent  outline-none
                border-gray-500 border rounded-xl px-6"
            />
            {/* <label >Image Url</label> */}
            <input
              type="file"
              placeholder=""
              ref={getFile}
              name="image"
              onChange={(e) => setimage(e.target.files[0])}
              // value={image}
              className="hidden"
            />
            <label className="text-2xl font-bold">Description</label>

            <textarea
              type="text"
              placeholder="Share your story...."
              name="description"
              onChange={handleChange}
              value={value.description}
              rows="5"
              cols="30"
              className="w-full py-2 text-black  bg-transparent  outline-none
               border-gray-500 border rounded-xl px-6"
            />

            <button
              className="bg-gradient-to-r from-green-400 to-blue-500 focus:ring-1 hover:from-pink-500 hover:to-orange-400
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

export default AddBlogs;
