import { ChangeEvent } from "react";

const Modal: React.FC<{
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  editedPost: { title: string; content: string };
  editPost: () => {};
  closeModal: () => void;
}> = ({ handleChange, editedPost, editPost, closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form action="" className="font-sans p-5 border-none">
          <h1 className="text-center text-3xl font-bold mb-5">Update Post</h1>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={editedPost.title}
            onChange={handleChange}
            required
          />
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            value={editedPost.content}
            rows={8}
            onChange={handleChange}
            className="w-full border-2 focus:outline-none"
            required
          ></textarea>
          <div className="flex justify-center">
            <button
              onClick={editPost}
              className="p-3 border-2 mt-10 rounded-md bg-slate-500 w-2/4 font-bold mr-10"
            >
              Update
            </button>
            <button
              onClick={closeModal}
              className="p-3 border-2 mt-10 rounded-md bg-slate-500 w-2/4 font-bold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;