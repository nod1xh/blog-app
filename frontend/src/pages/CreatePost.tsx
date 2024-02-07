import axios from "axios";
import { useState } from "react";

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    image: null as File | null,
    content: "",
    author: "",
    date: "",
  });

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
    formDataToSend.append("author", formData.author);
    formDataToSend.append("date", formData.date);

    try {
      const response = await axios.post(
        "http://localhost:5000/allposts",
        formDataToSend
      );
      console.log(response.data.data, "Post successfully created!");
    } catch (error) {
      console.error("There has been an error creating a post:", error);
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
      <form
        action="submit"
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="flex flex-col mt-10 w-2/4"
      >
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
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
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            rows={10}
            className="border-2 focus:outline-none w-full"
            value={formData.content}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <button className="p-3 border-2 mt-4 rounded-md bg-slate-500 font-bold">
          Create Post
        </button>
      </form>
    </div>
  );
}
