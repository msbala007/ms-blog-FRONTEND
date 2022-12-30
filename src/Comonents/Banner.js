import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import Slider from "react-slick";
import { motion } from "framer-motion";
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";
const Banner = ({ blog }) => {
  // const [blog, setpost] = useState([]);
  const [user, setuser] = useState([]);
  const id = localStorage.getItem("userId");
  const userBlogs = async () => {
    const res = await axios.get(
      `https://ms-blog.onrender.com/v1/blog/user/${id}`
    );

    const data = await res.data.blogs.blogs;
    const userData = await res.data.blogs;
    // console.log();
    setuser({ name: userData.name, photo: userData.photo });
    // setpost(data);
  };
  // console.log(user.profilePic);
  useEffect(() => {
    userBlogs();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  
  const random=Math.floor(Math.random() * 10 + 1)


  return (
    <>
      <div className="relative  h-52 m-6 sm:m-2  xl:h-96 lg-h-92">
        {/* <Slider */}
        {/* // {...settings} */}
        {/* // className="absolute w-full h-52    flex justify-center items-center  " */}
        {/* // > */}
        {/* <div className="   "> */}
        {/* {blog?.slice ).map(({ name, image, description }) => ( */}
        {/* // <div className="w-full"> */}
        {/* <h1 className="">{description}</h1> */}
        {/* </div> */}
        {/* // ))} */}

        {/* </Slider> */}
        {/* // </div> */}

        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          interval={2000}
          showArrows={false}
          className="  h-52 xl:h-96 flex justify-center items-center relative  "
        >
          {blog?.slice(0, random).map(({ name, image, description, _id }) => (
            <div className="relative " key={_id}>
              <div className="relative " key={_id}>
                <div
                  key={_id}
                  className="absolute bg-black opacity-50 h-full w-full "
                />
                <motion.h1
                  initial={{ opacity: 0, x: -700 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute text-xl font-bold line-clamp-1
                 mt-28 w-full text-center text-white bottom-0  mb-20  "
                >
                  {name}
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, x: 700 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute   text-white  text-sm text-center line-clamp-2 bottom-0 mb-4 "
                >
                  {description}
                </motion.h1>
                <img
                  src={`https://ms-blog.onrender.com/img/${image}`}
                  className="w-full h-52 xl:h-96 rounded-lg  object-cover "
                />
              </div>
            </div>
          ))}

          {/* <div> */}
          {/* <img */}
          {/* // src="http://localhost:5000/img/Blog-post-image-1671953499037.jpeg" */}
          {/* // className="w-full h-52 rounded-lg  object-cover " */}
          {/* // /> */}
          {/* </div> */}
          {/* <div> */}
          {/* <h1>bala</h1> */}
          {/* </div> */}
        </Carousel>
      </div>
    </>
  );
};

export default Banner;
