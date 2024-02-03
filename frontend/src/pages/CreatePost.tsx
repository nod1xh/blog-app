import axios from "axios";

export default function CreatePost() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const response = await axios.post(
        "http://localhost:5000/allposts",
        formData
      );
      console.log(response.data.data);
    } catch (error) {
      console.error("There has been an error creating a post:", error);
    }
  }

  return (
    <div className="flex flex-col items-center w-full">
      <form
        action=""
        method="post"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        className="flex flex-col mt-10 w-2/4"
      >
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input type="file" id="image" name="image" />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            rows={10}
            className="border-2 focus:outline-none w-full"
          ></textarea>
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input type="text" id="author" name="author" />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" />
        </div>
        <button className="p-3 border-2 mt-4 rounded-md bg-slate-500 font-bold">
          Create Post
        </button>
      </form>
    </div>
  );
}
