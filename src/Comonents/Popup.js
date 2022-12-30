import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import Spinner from "./Spinner";

const Popup = ({ close, blog, id }) => {
  const navigate = useNavigate();
  // const history=useHistory()
  const [spin, setSpin] = useState(false);
  const deletePost = async () => {
    try {
      const res = await axios.delete(
        `https://ms-blog.onrender.com/v1/blog/post/delete/${id}`
      );
      const data = await res.data.blog;

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleterequest = () => {
    deletePost()
      .then(() => navigate("/myblogs"))
      .then(() => window.location.reload(false))
      .then(() => close());
  };

  return (
    <>
      <div className="fixed z-30 inset-0 top-0 l-0 h-screen  bg-gray-200 bg-opacity-50 w-full">
        <div className="fixed inset-0 top-0 l-0  flex justify-center items-center   ">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, ease: [0, 0.71, 0.2, 1.01] }}
            className="bg-white w-1/2 rounded-xl p-5 text-lg flex justify-center 
           shadow-black shadow-2xl sm:w-full sm:mx-4 md:w-full md:mx-4 "
          >
            <div className="flex flex-col justify-center items-center space-y-4">
              <h1 className="text-2xl font-bold line-clamp-1">{blog}</h1>
              <h2 className="flex">Do you want to delete this post?</h2>
              <div className="flex justify-between w-full">
                <button
                  onClick={close}
                  className="bg-pink-200 px-6 py-1 rounded-xl hover:bg-pink-300"
                >
                  Close
                </button>
                <button
                  onClick={deleterequest}
                  className="bg-pink-600 px-6 py-1 rounded-xl  hover:bg-pink-900 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Popup;
