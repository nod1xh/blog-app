import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { PostsContext } from "../context/posts-context";
import Modal from "../components/Modal";
import baseUrl from "../config/config";
import Prompt from "../components/Prompt";

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
  const [isDeleted, setIsDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [postEdited, setPostEdited] = useState(false);
  const [promptDelete, setPromptDelete] = useState(false);
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
    const { name, value, defaultValue } = e.target;

    setEditedPost({
      ...editedPost,
      [name]: value || defaultValue,
    });
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${baseUrl}/allPosts/${postId}`);
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
      const response = await axios.delete(`${baseUrl}/allPosts/${postId}`, {
        headers: {
          Authorization: token,
        },
      });
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
    setEditedPost(selectedPost!);
  }

  async function editPost(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const token = getToken();
    try {
      const response = await axios.put(
        `${baseUrl}/allPosts/${postId}`,
        editedPost,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setSelectedPost(response.data.data);
      setPostEdited(true);
      setTimeout(() => {
        setPostEdited(false);
      }, 2000);
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

  function promptUser() {
    setPromptDelete((prevPromptDelete) => !prevPromptDelete);
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
          <h1 className="text-3xl text-center mb-5 border-none">
            {selectedPost?.title}
          </h1>
          <div className="border-b border-slate-500 w-full"></div>
          <div>
            <p className="my-5 leading-8">{selectedPost?.content}</p>
          </div>
          <div className="border-b border-slate-500 w-full"></div>
          <div className="flex justify-between w-full">
            <p className="mb-5 mt-3 font-semibold text-white">
              By: {selectedPost?.author}
            </p>
            <p className="mb-5 mt-3 font-semibold text-white">
              Date: {selectedPost?.date}
            </p>
          </div>
          {isLogged && (
            <div className="flex justify-around w-full mt-3">
              <button className="btn-1" onClick={openModal}>
                Update Post
              </button>
              <button className="btn-1" onClick={promptUser}>
                Delete Post
              </button>
            </div>
          )}
        </div>
      </div>
      {isEditing && (
        <Modal
          handleChange={handleChange}
          editedPost={editedPost}
          editPost={editPost}
          closeModal={openModal}
          selectedPost={selectedPost}
        ></Modal>
      )}
      {postError && (
        <div className="popupError">
          <h3>{postError}</h3>
        </div>
      )}
      {postEdited && (
        <div className="popupError">
          <h3>Post has been successfully updated!</h3>
        </div>
      )}
      {promptDelete && (
        <Prompt closeModal={promptUser} handleDelete={handleDelete}></Prompt>
      )}
    </>
  );
}
