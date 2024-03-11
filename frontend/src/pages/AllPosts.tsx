import { useContext } from "react";
import { PostsContext } from "../context/posts-context";
import { NavLink } from "react-router-dom";

export default function AllPosts() {
  const { allPosts, fetchError } = useContext(PostsContext);

  return fetchError ? (
    <div>
      <h1>{fetchError}</h1>
    </div>
  ) : allPosts.length > 0 ? (
    <>
      <div className="font-semibold text-3xl flex justify-center mt-10">
        <h1>All posts</h1>
      </div>
      <div className="allposts-container">
        {allPosts.map((post) => (
          <NavLink
            to={`/allposts/${post._id}`}
            className="bg-gradient-to-t from-sky-300 via-sky-400 to-sky-600 hover:from-sky-800 hover:to-sky-950 p-8 shadow-sm rounded-md mx-2 flex flex-col items-center h-40 relative"
            key={post._id}
          >
            <h2 className="font-medium text-white w-full text-center">
              {post.title}
            </h2>
            <div className="absolute bottom-0 left-0 right-0 text-center m-2 flex justify-between">
              <p className="text-gray-100">
                Author:
                <span className="font-semibold"> {post.author}</span>
              </p>
              <p className="text-gray-100">
                Date:
                <span className="font-semibold"> {post.date}</span>
              </p>
            </div>
          </NavLink>
        ))}
      </div>
    </>
  ) : (
    <div className="text-3xl flex justify-center mt-10">
      <h1>Currently, there are no posts available.</h1>
    </div>
  );
}
