import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AddBlogs from "./Comonents/AddBlogs";
import Auth from "./Comonents/Auth";
import Blogs from "./Comonents/Blogs";
import Blog from "./Comonents/Blog";
import Header from "./Comonents/Header";
import Login from "./Comonents/Login";
// import MyBlogs from "./Comonents/MyBlogs";
// import Signup from "./Comonents/Signup";
import Skeleton from "./Comonents/Skeleton";
import UserPosts from "./Comonents/UserPosts";
// import Bala from "./Extra/Bala";
import DetailBlogPage from "./Comonents/DetailBlogPage";
import BlogEditAndDelete from "./Comonents/BlogEditAndDelete";
import Profile from "./Comonents/Profile";
import Popup from "./Comonents/Popup";
import Banner from "./Comonents/Banner";
import Footer from "./Comonents/Footer";
import { useSelector } from "react-redux";
//
function App() {
  const isLogedIn = useSelector((store) => store.auth.isLogedIn);
  //  const [user, setUser] = useState(false);
  //
  return (
    <>
      {/* <Bala /> */}
      {/* <Routes> */}
      {/* <Route path="/" element={<Bala />} /> */}
      {/* <Route path="/blogs" element={<Blogs />} /> */}
      {/* <Route path="/login" element={<Login />} /> */}
      {/* </Routes> */}

      <div className="bg-gray-200 font-Carter max-w-screen-2xl mx-auto">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Blog />
                {isLogedIn && <Footer />}
              </>
            }
          />

          <Route
            path="/blogs"
            element={
              <>
                <Blog />
                {isLogedIn && <Footer />}
              </>
            }
          />
          {/* <Route path="/signin" element={<Signup />} /> */}
          <Route path="/signup" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myblogs" element={<UserPosts />} />
          <Route path="/add-blogs" element={<AddBlogs />} />
          <Route path="/blog/:id" element={<DetailBlogPage />} />
          <Route path="/user/blog/edit/:id" element={<BlogEditAndDelete />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/delete" element={<Popup />} />
          {/* <Route path="/delete" element={< Footer/>} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
