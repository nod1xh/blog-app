import axios from "axios";
import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/signup",
        formData
      );
      console.log(response.data.message);
    } catch (error) {
      console.error("Error signing up", error);
    }
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
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
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
