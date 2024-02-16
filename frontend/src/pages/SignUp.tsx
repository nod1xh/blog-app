import { useContext, useEffect } from "react";
import { PostsContext } from "../context/posts-context";
import { NavLink, useNavigate } from "react-router-dom";
import Redirect from "../components/Redirect";

export default function SignUp() {
  const { user, setUser, handleSignUp, isLogged } = useContext(PostsContext);
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  }

  useEffect(() => {
    if (isLogged) {
      setTimeout(() => {
        navigate("/allposts");
      }, 6000);
    }
  }, [isLogged, navigate]);

  return isLogged ? (
    <>
      <Redirect
        content={`Welcome to the blog ${user.username}! To browse all the latest posts, 
        you will be redirected to the 'All Posts' page. Enjoy exploring! `}
      />
    </>
  ) : (
    <div className="flex justify-center">
      <div className="w-1/4 flex flex-col items-center mt-20">
        <form
          action="submit"
          method="post"
          className="w-3/4 font-courier p-5"
          encType="multipart/form-data"
          onSubmit={handleSignUp}
        >
          <h1 className="text-center text-3xl font-bold mb-10">
            Create your account
          </h1>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Username*"
            className="mb-3"
            required
          />
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email*"
            className="mb-3"
          />
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password*"
          />
          <div className="flex justify-center">
            <button className="p-2 mt-10 rounded-md bg-slate-500 hover:bg-[#3498db] text-white w-full font-bold ">
              Sign Up
            </button>
          </div>
        </form>
        <p className="font-thin text-sm inline mt-4">
          Already have an account?
          <NavLink className="signin" to="/login">
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  );
}
