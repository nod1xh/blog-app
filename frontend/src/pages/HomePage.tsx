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
      <div className="allposts-container">
        {featuredPosts.map((featuredPost) => (
          <div className="p-8 mb-10" key={featuredPost._id}>
            <div className="flex justify-center">
              <img
                src={`http://localhost:5000/${featuredPost.image.src}`}
                alt="img"
                loading="lazy"
              />
            </div>
            <h2 className="font-medium">{featuredPost.title}</h2>
            <div className="flex justify-between">
              <p className="text-gray-100 text-sm">
                Author:
                <span className="font-semibold"> {featuredPost.author}</span>
              </p>
              <p className="text-gray-100 text-sm">
                Date:
                <span className="font-semibold"> {featuredPost.date}</span>
              </p>
            </div>
            <div className="flex justify-center mt-2">
              <NavLink
                className="bg-blue-500 hover:bg-blue-600 hover:text-black text-white font-bold py-2 px-3 rounded inline-block transition duration-300"
                to={`/${featuredPost._id}`}
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
      <h1>Loading posts...</h1>
    </div>
  );
}
