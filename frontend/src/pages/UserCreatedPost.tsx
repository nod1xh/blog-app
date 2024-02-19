import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { PostsContext } from "../context/posts-context";
import Modal from "../components/Modal";

type PostParams = {
  postId: string;
};

interface Post {
  id: string;
  title: string;
  image: {
    src: string;
  };
  content: string;
  author: string;
  date: string;
  userId: string;
}

export default function UserPost() {
  const { postId } = useParams<PostParams>();
  const navigate = useNavigate();
  const { setAllPosts, getToken } = useContext(PostsContext);

  const [selectedPost, setSelectedPost] = useState<Post>();
  const [isDeleted, setIsDeleted] = useState<Boolean>(false);
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const [editedPost, setEditedPost] = useState<{
    title: string;
    content: string;
  }>({
    title: "",
    content: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setEditedPost({
      ...editedPost,
      [name]: value,
    });
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:5000/allPosts/${postId}`
        );
        setSelectedPost(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  async function deletePost(id: string) {
    try {
      const token = getToken();
      const response = await axios.delete(
        `http://localhost:5000/allPosts/${postId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setAllPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      setIsDeleted(true);
      console.log(response.data, "Post successfully deleted");
    } catch (error) {
      const err = error as AxiosError;
      if (err.response && err.response.status === 403) {
        console.error("You are not authorized to delete this post");
      } else {
        console.error("Error deleting the poost:", error);
      }
    }
  }

  function handleDelete() {
    deletePost(postId!);
  }

  function redirectToAllPosts() {
    if (isDeleted) {
      setTimeout(() => {
        navigate("/allposts");
        console.log("Go to All posts");
      }, 2000);
    }
  }

  useEffect(() => {
    redirectToAllPosts();
  }, [isDeleted]);

  async function editPost() {
    try {
      const response = await axios.put(
        `http://localhost:5000/allposts/${postId}`,
        editedPost
      );

      console.log(response.data.data);
    } catch (error) {
      console.error("Something went wrong while editing the post:", error);
    }
  }

  function openModal() {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  }

  return isDeleted ? (
    <h1 className="text-center font-semibold text-2xl mt-5">
      Post has been deleted, redirecting to all posts.
    </h1>
  ) : (
    <>
      <div className="mt-10 flex items-center justify-center">
        <div className="flex flex-col items-center w-2/4">
          <h1 className="text-3xl text-center">{selectedPost?.title}</h1>
          <p className="mb-5 mt-3 font-semibold underline text-left">
            by: {selectedPost?.author} on {selectedPost?.date}
          </p>
          <div className="m-5">
            <img
              src={`http://localhost:5000/${selectedPost?.image.src}`}
              alt="image"
              className="w-full h-auto"
            />
          </div>
          <div className="border-2 border-slate-500 w-full"></div>
          <div>
            <p className="leading-8">{selectedPost?.content}</p>
          </div>
          <div className="border-2 border-slate-500 w-full"></div>
          <div className="flex justify-around w-full mt-3">
            <button className="btn-1" onClick={openModal}>
              Update Post
            </button>
            <button className="btn-1" onClick={handleDelete}>
              Delete Post
            </button>
          </div>
        </div>
      </div>
      <div>
        {isEditing && (
          <Modal
            handleChange={handleChange}
            editedPost={editedPost}
            editPost={editPost}
            closeModal={openModal}
          ></Modal>
        )}
      </div>
    </>
  );
}
