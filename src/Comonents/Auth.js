import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/authSlice";
import Spinner from "./Spinner";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

const Auth = () => {
  const [user, setUser] = useState(false);
  const [error, seterror] = useState();
  const [invaliderror, setinvaliderror] = useState();
  const [emailError, setemailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [spin, setspin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [see, setSee] = useState(false);

  // const formData = new FormData();
  // formData.append("name", value.name);

  // formData.append("email", value.email);
  // formData.append("password", value.password);

  const userAccount = async (type = "signup") => {
    const res = await axios
      .post(`${process.env.URL}/v1/post/user/${type}`, {
        name: value.name,
        email: value.email,
        password: value.password,
      })
      .catch((error) => {
        seterror(error.response.data.error);
        setinvaliderror(error.response.data.message);
        setemailError(error.response.data.emailError);
      });
    const data = await res.data.user;

    setspin(false);
    return data;
  };

  // } catch (error) {
  //
  // seterror(error.response.data.error);
  // setinvaliderror(error.response.data.message);
  // }

  const handleChange = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user) {
      await userAccount("login")
        .then(() => dispatch(authActions.login()))
        .then((data) => localStorage.setItem("userId", data._id))
        .then(() => navigate("/blogs"));
    } else {
      userAccount("signup")
        .then((data) => localStorage.setItem("userId", data._id))
        .then(() => dispatch(authActions.signup()))
        .then(() => navigate("/blogs"));
    }
  };

  return (
    <>
      {spin && <Spinner />}
      <div className=" flex flex-col min-h-screen justify-center items-center space-y-8 ">
        <h1 className="text-2xl font-bold">Welcome to MS BLOG</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex justify-center">
            {user ? (
              <h1 className="text-xl font-bold">Log in</h1>
            ) : (
              <h1 className="text-xl font-bold">Sign up</h1>
            )}
          </div>
          <div className="flex flex-col space-y-4 lg:w-96 xl:w-96">
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={value.name}
              className="w-full py-2 text-black bg-transparent  outline-none
       border-sky-400 border-b-2 "
            />

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

            {error && (
              <div className="text-sm text-red-500 flex justify-center ">
                {error}
              </div>
            )}

            {passwordError && (
              <div className="text-sm text-red-500 flex justify-center ">
                {passwordError}
              </div>
            )}

            {emailError && (
              <div className="text-sm text-red-500 flex justify-center ">
                {emailError}
              </div>
            )}

            {invaliderror && (
              <div className="text-sm text-red-500 flex justify-center">
                {invaliderror}
              </div>
            )}
            <div className="flex justify-center py-5">
              <button
                type="submit"
                className="bg-black rounded-lg w-full p-2 text-white"
              >
                {user ? "login" : "Create an new account"}
              </button>
            </div>
            <div className="flex justify-center items-center">
              <h3 className="text-sm">Already have an account?</h3>
              <Link
                to={user ? "/signup" : "/login"}
                onClick={() => setUser(!user)}
              >
                {user ? (
                  "Don't have an account"
                ) : (
                  <h4 className="text-black font-bold">Click here...</h4>
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
