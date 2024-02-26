import { ChangeEvent, useContext, useEffect } from "react";
import { PostsContext } from "../context/posts-context";

const Modal: React.FC<{
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  editedPost: { title: string; content: string };
  editPost: (e: ChangeEvent<HTMLFormElement>) => void;
  closeModal: () => void;
}> = ({ handleChange, editPost, closeModal }) => {
  const styles =
    "p-3 mt-10 rounded-md bg-slate-500 hover:bg-[#3498db] w-2/4 font-bold text-white";
  const { postError } = useContext(PostsContext);

  useEffect(() => {
    editPost;
  }, [editPost]);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form
          action=""
          className="font-sans p-5 border-none"
          onSubmit={editPost}
        >
          <h1 className="text-center text-3xl font-bold mb-5">Update Post</h1>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={handleChange}
            required
          />
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            rows={8}
            onChange={handleChange}
            className="w-full border-2 focus:outline-none"
            required
          ></textarea>
          <div className="flex justify-center">
            <button type="submit" className={`${styles} mr-10`}>
              Update
            </button>
            <button type="button" onClick={closeModal} className={styles}>
              Cancel
            </button>
          </div>
        </form>
        {postError && (
          <div className="popupError">
            <h3>{postError}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
