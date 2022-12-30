import React from "react";
import { SocialIcon } from "react-social-icons";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div className="min-h-screen bg-[rgba(26,2,16,0.88)] rounded-xl m-8  text-white sm:m-2 flex flex-col  justify-around">
        <div className="flex justify-center items-center flex-col space-y-4">
          <h1 className="text-2xl font-bold text-center">
            Let's get started on something great{" "}
          </h1>
          <h4 className="text-center">
            share you thoghts and connected with others{" "}
          </h4>
          <div className="space-x-4">
            {/* <button className="border-2 border-white px-8 py-2 rounded-xl "> */}
            {/* <Link to="/"> Go to Blogs</Link> */}
            {/* </button> */}
            <button className="border-2 border-white px-8 py-2 rounded-xl ">
              <Link to="/add-blogs"> create a post</Link>
            </button>
          </div>
        </div>

        <motion.div
          initial={{ x: -400, opacity: 0 }}
          whileInView={{ x: 0, opacity: 10 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="flex justify-evenly sm:w  "
        >
          <SocialIcon url="https://twitter.com/msbaladev?t=tECHGRW86C7is5tFxUwznA&s=09" />
          <SocialIcon url="https://m.facebook.com/100036143393742/" />
          <SocialIcon url="https://github.com/msbala007" bgColor="blue" />
          <SocialIcon url="https://www.linkedin.com/in/bala-s-1395a621a/" />
          <SocialIcon
            url="https://www.instagram.com/msbala57/"
            bgColor="white"
          />
        </motion.div>

        <div className="flex justify-center ">
          <h6 className="text-sm ">&#169;2077 ms blog.All rights reserved</h6>
        </div>
      </div>
    </>
  );
};

export default Footer;
