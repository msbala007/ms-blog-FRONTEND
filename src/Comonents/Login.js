import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authActions } from "../Store/authSlice";
import { useDispatch } from "react-redux";
import Spinner from "./Spinner";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

const Auth = () => {
  const [user, setUser] = useState(true);
  const [error, seterror] = useState();
  const [email, setemail] = useState();
  const [spin, setspin] = useState(false);
  const [see, setSee] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState({
    // name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const userAccount = async (type = "login") => {
    const res = await axios.post(`https://ms-blog.onrender.com/user/${type}`, {
      email: value.email,
      password: value.password,
    }).catch((error)=>{
       seterror(error.response.data.error);
       setemail(error.response.data.error);
    })

    const data = await res.data.user;

    return data;
  };

  // console.log(userAccount());

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (
    // !value.email &&
    // value.email.trim() === "" &&
    // !value.password &&
    // value.password.trim() < 8
    // ) {
    // return;
    // }
    await userAccount("login")
      .then((data) => localStorage.setItem("userId", data._id))
      .then(() => dispatch(authActions.login()))
      .then(() => navigate("/blogs"));
  };
  // const some=

  return (
    <>
      {spin && <Spinner />}
      <div className=" flex flex-col min-h-screen  justify-center items-center space-y-8 w-full">
        <h1 className="text-2xl font-bold">Welcome back, MS BLOG</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-center">
            {user ? (
              <h1 className="text-xl font-bold">Log in</h1>
            ) : (
              <h1 className="text-xl font-bold">Sign up</h1>
            )}
          </div>
          <div className="flex flex-col space-y-4 lg:w-96 xl:w-96">
            {user ? (
              ""
            ) : (
              <input
                type="name"
                placeholder="name"
                // name="name"
                onChange={handleChange}
                // value={value.name}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={value.email}
              className="w-full py-2 text-black bg-transparent  outline-none
                   border-sky-400 border-b-2 "
            />

            <div className=" relative ">
              <input
                type={see ? `text` : `password`}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={value.password}
                className="w-full py-2 text-black bg-transparent  outline-none relative
     border-sky-400 border-b-2 "
              />
              <span
                className="inset-y-0 rigtht-0 eye flex items-center "
                onClick={() => setSee(!see)}
              >
                {see ? (
                  <VisibilityOffRoundedIcon fontSize="medium" />
                ) : (
                  <VisibilityIcon fontSize="medium" />
                )}
              </span>
            </div>

            {error && <div className="text-sm text-red-500">{error}</div>}
            {email &&  <div className="text-sm text-red-500">{setemail}</div>}
            <div className="flex justify-center py-5">
              <button
                type="submit"
                className="bg-black rounded-lg w-full p-2 text-white"
              >
                {user ? "Log in" : "Create an new account"}
              </button>
            </div>

            <div className="flex justify-center items-center">
              <h3 className="text-sm">Don't have an account?</h3>
              <Link
                to={user ? "/signup" : "/login"}
                onClick={() => setUser(!user)}
              >
                {user ? (
                  <h4 className="text-black font-bold">Click here...</h4>
                ) : (
                  "Already have an account"
                )}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Auth;
