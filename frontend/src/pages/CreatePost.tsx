import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "../context/posts-context";
import Redirect from "../components/Redirect";

export default function CreatePost() {
  const { setAllPosts, getToken } = useContext(PostsContext);
  const [postCreated, setPostCreated] = useState<Boolean>(false);
  const [formData, setFormData] = useState({
    title: "",
    image: null as File | null,
    content: "",
    date: new Date().toISOString().slice(0, 10),
  });
  const navigate = useNavigate();

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      // If user choose the file or not
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("image", formData.image as File);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("date", formData.date);

    try {
      const token = getToken();
      const response = await axios.post(
        "http://localhost:5000/allposts",
        formDataToSend,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setAllPosts((prevPosts) => [...prevPosts, response.data.data]);
      setPostCreated(true);
      console.log(response.data.data, "Post successfully created!");
    } catch (error) {
      console.error("There has been an error creating a post:", error);
    }
  }

  useEffect(() => {
    if (postCreated) {
      setTimeout(() => {
        navigate("/allposts");
        console.log("Go to All posts");
      }, 5000);
    }
  }, [postCreated, navigate]);

  return postCreated ? (
    <Redirect
      content="Congratulations on your new post! It's now live on the blog. 
      We've redirected you to all posts to see your latest creation among others."
    />
  ) : (
    <div className="flex flex-col items-center w-full">
      <form
        action="submit"
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="flex flex-col mt-10 w-7/12"
        aria-required
      >
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            rows={10}
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button className="form-btn w-2/4 relative left-1/4">
          Create Post
        </button>
      </form>
    </div>
  );
}
