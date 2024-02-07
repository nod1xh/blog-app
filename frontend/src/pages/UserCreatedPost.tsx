import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
}

export default function UserPost() {
  const { postId } = useParams<PostParams>();

  const [selectedPost, setSelectedPost] = useState<Post>();

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

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="flex flex-col items-center w-2/4">
        <h1 className="text-3xl text-center">{selectedPost?.title}</h1>
        <p className="mb-5 mt-3 font-semibold underline text-left">
          by: {selectedPost?.author} on {selectedPost?.date}
        </p>
        <div>
          <img
            src={`http://localhost:5000/${selectedPost?.image.src}`}
            alt="image"
            className="h-40"
          />
        </div>
        <div>
          <p className="leading-8">{selectedPost?.content}</p>
        </div>
      </div>
    </div>
  );
}
