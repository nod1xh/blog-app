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
  const { setAllPosts, getToken, isLogged, postError, setPostError } =
    useContext(PostsContext);

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
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        if (err.response?.status === 500) {
          setPostError(err.response.data.message);
        }
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
      console.log(response);
      setAllPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
      setIsDeleted(true);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      if (err.response?.status === 403) {
        setPostError(err.response.data.message);
      }
      setTimeout(() => {
        setPostError("");
      }, 5000);
    }
  }

  function handleDelete() {
    deletePost(postId!);
  }

  function redirectToAllPosts() {
    if (isDeleted) {
      setTimeout(() => {
        navigate("/allposts");
      }, 2000);
    }
  }

  useEffect(() => {
    redirectToAllPosts();
  }, [isDeleted]);

  function openModal() {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  }

  async function editPost(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = getToken();
    try {
      const response = await axios.put(
        `http://localhost:5000/allposts/${postId}`,
        editedPost,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setSelectedPost(response.data.data);
      openModal();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      if (err.response?.status === 403) {
        setPostError(err.response.data.message);
      }
      setTimeout(() => {
        setPostError("");
      }, 5000);
    }
  }

  if (!selectedPost) {
    return (
      <div className="flex justify-center">
        <h1 className="text-center font-semibold text-2xl mt-5 text-red-700">
          Page not found.
        </h1>
      </div>
    );
  }

  return isDeleted ? (
    <div className="flex justify-center">
      <h1 className="text-center font-semibold text-2xl mt-5">
        Post has been deleted, redirecting to all posts.
      </h1>
    </div>
  ) : (
    <>
      <div className="mt-10 flex items-center justify-center">
        <div className="flex flex-col items-center w-2/4">
          <h1 className="text-3xl text-center">{selectedPost?.title}</h1>
          <p className="mb-5 mt-3 font-semibold underline text-left text-white">
            By: {selectedPost?.author}
          </p>
          <p className="mb-5 mt-3 font-semibold underline text-left text-white">
            On: {selectedPost?.date}
          </p>
          <div className="m-5">
            <img
              src={`http://localhost:5000/${selectedPost?.image.src}`}
              alt="image"
              className="w-full h-auto"
            />
          </div>
          <div className="border-b border-slate-500 w-full"></div>
          <div>
            <p className="leading-8">{selectedPost?.content}</p>
          </div>
          <div className="border-b border-slate-500 w-full"></div>
          {isLogged && (
            <div className="flex justify-around w-full mt-3">
              <button className="btn-1" onClick={openModal}>
                Update Post
              </button>
              <button className="btn-1" onClick={handleDelete}>
                Delete Post
              </button>
            </div>
          )}
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
      {postError && (
        <div className="popupError">
          <h3>{postError}</h3>
        </div>
      )}
    </>
  );
}
