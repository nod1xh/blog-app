import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { PostsContext } from "../context/posts-context";

export default function HomePage() {
  const { featuredPosts } = useContext(PostsContext);

  return featuredPosts.length > 0 ? (
    <>
      <div className="text-3xl flex justify-center mt-10">
        <h1>Featured posts</h1>
      </div>
      <div className="allposts-container ">
        {featuredPosts.map((featuredPost) => (
          <NavLink
            to={`/${featuredPost._id}`}
            className="p-8 shadow-sm bg-slate-400 rounded-md mx-2 hover:bg-slate-500 flex flex-col items-center h-40 relative"
            key={featuredPost._id}
          >
            <h2 className="font-medium text-white w-full text-center">
              {featuredPost.title}
            </h2>
            <div className="absolute bottom-0 left-0 right-0 text-center m-2 flex justify-between">
              <p className="text-gray-100 text-sm">
                Author:
                <span className="font-semibold"> {featuredPost.author}</span>
              </p>
              <p className="text-gray-100 text-sm">
                Date:
                <span className="font-semibold"> {featuredPost.date}</span>
              </p>
            </div>
          </NavLink>
        ))}
      </div>
    </>
  ) : (
    <div className="text-3xl flex justify-center mt-10">
      <h1>Loading posts...</h1>
    </div>
  );
}
