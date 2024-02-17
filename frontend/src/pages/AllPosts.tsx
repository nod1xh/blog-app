import { useContext } from "react";
import { PostsContext } from "../context/posts-context";
import { NavLink } from "react-router-dom";

export default function AllPosts() {
  const { allPosts } = useContext(PostsContext);

  return allPosts.length > 0 ? (
    <>
      <div className="font-semibold text-2xl text-center mt-10">
        <h1>All posts</h1>
      </div>
      <div className="allposts-container">
        {allPosts.map((post) => (
          <div className="mb-10 p-4" key={post._id}>
            <div className="flex justify-center">
              <img
                src={`http://localhost:5000/${post.image.src}`}
                alt="img"
                className="h-72 w-full"
              />
            </div>
            <h1 className="font-medium">{post.title}</h1>
            <p>Author: {post.author} </p>
            <p>Date: {post.date}</p>
            <div className="flex items-center mt-2 ">
              <NavLink
                className="hover:bg-transparent"
                to={`/allposts/${post._id}`}
              >
                View Post
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : (
    <div className="text-3xl flex justify-center mt-10">
      <h1>No posts to show</h1>
    </div>
  );
}
