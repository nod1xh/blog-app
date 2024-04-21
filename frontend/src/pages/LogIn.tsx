import React, { useContext, useEffect } from "react";
import { PostsContext } from "../context/posts-context";
import { NavLink, useNavigate } from "react-router-dom";
import Redirect from "../components/Redirect";

export default function LogIn() {
  const { userLogin, setUserLogin, handleLogIn, isLogged, error } =
    useContext(PostsContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      setTimeout(() => {
        navigate("/allposts");
      }, 4000);
    }
  }, [isLogged, navigate]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUserLogin({
      ...userLogin,
      [name]: value,
    });

    localStorage.setItem("user", userLogin.username);
  }

  return isLogged ? (
    <>
      <Redirect
        content={`Welcome back ${userLogin.username}! 
        Dive into the latest blog posts! We've missed your curious mind.`}
      />
    </>
  ) : (
    <div className="flex justify-center">
      <div className="w-2/4 flex flex-col items-center mt-20">
        <form
          action="submit"
          method="post"
          className="w-3/4 font-courier p-5"
          encType="multipart/form-data"
          onSubmit={handleLogIn}
        >
          <div className="flex justify-center">
            <h1 className="text-3xl font-bold mb-10">Sign In</h1>
          </div>
          <div className="mb-5">
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              placeholder="Username*"
              autoComplete="true"
            />
            {error && <small>{error.username}</small>}
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              placeholder="Password*"
              autoComplete="true"
            />
            {error && <small>{error.password}</small>}
          </div>
          {error && <small>{error.general}</small>}
          <div className="flex justify-center">
            <button className="form-btn">Sign In</button>
          </div>
        </form>
        <p className="font-thin text-sm inline mt-4">
          Don't have an account?
          <NavLink className="signin" to="/signup">
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
}
