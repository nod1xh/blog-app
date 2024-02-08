export default function Modal() {
  return (
    <div className="flex justify-center w-full">
      <div className="w-2/4 flex flex-col items-center mt-20">
        <form action="" className="w-3/4 font-courier p-5">
          <h1 className="text-center text-3xl font-bold mb-5">Update Post</h1>
          <label htmlFor="username">Title</label>
          <input type="text" id="username" />
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            rows={10}
            className="w-full border-2 focus:outline-none"
          ></textarea>
          <div className="flex justify-center">
            <button className="p-3 border-2 mt-10 rounded-md bg-slate-500 w-2/4 font-bold">
              Update
            </button>
            <button className="p-3 border-2 mt-10 rounded-md bg-slate-500 w-2/4 font-bold">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
