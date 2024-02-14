import { useContext, useEffect } from "react";
import { PostsContext } from "../context/posts-context";
import { useNavigate } from "react-router-dom";
import Redirect from "../components/Redirect";

export default function SignUp() {
  const { user, setUser, handleSubmit, isLogged } = useContext(PostsContext);
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
        console.log("Redirecting to all posts");
      }, 6000);
    }
  }, [isLogged, navigate]);

  return isLogged ? (
    <>
      <Redirect
        content="Welcome to the blog! To browse all the latest posts, 
        you will be redirected to the 'All Posts' page. Enjoy exploring! "
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
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-3xl font-bold mb-10">
            Sign Up to create posts
          </h1>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <div className="flex justify-center">
            <button className="p-3  mt-10 rounded-md bg-slate-500 hover:bg-[#3498db] text-white w-2/4 font-bold ">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
