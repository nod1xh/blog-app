export default function CreatePost() {
  return (
    <div className="flex flex-col items-center w-full">
      <form
        action=""
        method="post"
        encType="multipart/form-data"
        className="flex flex-col mt-10 w-2/4"
      >
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input type="file" id="image" name="image" />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            rows={10}
            className="border-2 focus:outline-none w-full"
          ></textarea>
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input type="text" id="author" />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" />
        </div>
        <button className="p-3 border-2 mt-4 rounded-md bg-slate-500 font-bold">
          Create Post
        </button>
      </form>
    </div>
  );
}
