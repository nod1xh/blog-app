import { useContext } from "react";
import { PostsContext } from "../context/posts-context";

export default function SignUp() {
  const { user, setUser, handleSubmit } = useContext(PostsContext);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  }

  return (
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
            <button className="p-3 border-2 mt-10 rounded-md bg-slate-500 w-2/4 font-bold">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
