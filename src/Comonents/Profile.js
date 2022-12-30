import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Header from "./Header";
import AddIcon from "@mui/icons-material/Add";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import Spinner from "./Spinner";

const Profile = () => {
  const [user, setuser] = useState({
    name: "",
    email: "",
    photo: "",
    city: "",
    nickname: "",
  });
  const [image, setimage] = useState();
  const [preview, setPreview] = useState();
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image]);

  const getFile = useRef();
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();

  const geUserDetails = async () => {
    const res = await axios.get(`https://ms-blog.onrender.com/user/${id}`);
    const data = await res.data.userblogs;
    setuser({
      name: data.name,
      email: data.email,
      pic: data.photo,
      city: data.city,
      nickname: data.nickname,
    });
    // console.log(data);
    // return data;
  };

  useEffect(() => {
    geUserDetails();
  }, []);

  //
  const formData = new FormData();
  formData.append("name", user.name);
  formData.append("photo", image);
  formData.append("city", user.city);
  formData.append("nickname", user.nickname);
  // console.log(formData);
  const updateUserDetails = async () => {
    setSpin(true);
    const res = await axios.put(
      `https://ms-blog.onrender.com/user/profile/${id}`,
      formData,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          // "Content-Type": "application/json",
        },
      }
    );

    const data = await res.data;
    setSpin(false);
    return data;
  };
  const handleChange = (e) => {
    setuser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserDetails()
      .then((data) => setuser(data))
      .then(() => navigate("/"));
  };
  return (
    <>
      {spin && <Spinner />}
      <div className=" flex flex-col min-h-screen  justify-center items-center space-y-8 w-full">
        {/* <h1 className="text-2xl font-bold">{`Welcome ${user.name}`}</h1> */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col justify-center  lg:w-96 xl:w-96 space-y-4 ">
            <div className="flex justify-center relative">
              <img
                src={`https://ms-blog.onrender.com/profile/${user.pic}`}
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-black shadow-2xl "
              />

              <input
                type="file"
                ref={getFile}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setimage(file);
                  console.log(file);
                }}
                className="hidden"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  getFile.current.click();
                }}
                className=" "
              >
                <AddAPhotoOutlinedIcon fontSize="large" color="secondary" />
              </button>
            </div>
            <div>
              <label>Name:</label>
              <input
                type="text"
                // placeholder="name"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full py-2 text-black  bg-transparent  outline-none
                       border-gray-500 border rounded-xl px-6"
              />
            </div>
            <div>
              <label>Nick name:</label>
              <input
                type="text"
                // placeholder="name"
                name="nickname"
                value={user.nickname}
                onChange={handleChange}
                className="w-full py-2 text-black  bg-transparent  outline-none
                border-gray-500 border rounded-xl px-6"
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                placeholder="email"
                name="email"
                // onChange={handleChange}
                defaultValue={user.email}
                readOnly
                // value={user.email}
                className="w-full py-2 text-black  bg-transparent  outline-none
                border-gray-500 border rounded-xl px-6"
              />{" "}
            </div>
            <div>
              <label>City/Town:</label>
              <input
                type="text"
                // placeholder="name"

                name="city"
                value={user.city}
                onChange={handleChange}
                className="w-full py-2 text-black  bg-transparent  outline-none
             border-gray-500 border rounded-xl px-6"
              />
            </div>

            <div className="flex justify-center py-5">
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-black rounded-lg w-full p-2 text-white"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
