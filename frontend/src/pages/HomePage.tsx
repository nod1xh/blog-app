import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { FeaturedPostsContext } from "../context/featuredposts-context";

export default function HomePage() {
  const { featuredPosts } = useContext(FeaturedPostsContext);

  return featuredPosts.length > 0 ? (
    <>
      <div className="font-semibold text-2xl text-center mt-10">
        <h1>Featured posts</h1>
      </div>
      <div className="flex justify-between items-center mt-10">
        {featuredPosts.map((featuredPost) => (
          <div
            className="border-2 border-[#f1f5f9] rounded-lg p-2 mb-10 w-1/4"
            key={featuredPost.id}
          >
            <div className="flex justify-center">
              <img
                src={`http://localhost:5000/${featuredPost.image.src}`}
                alt="img"
                className="h-72"
              />
            </div>
            <h1 className="font-medium">{featuredPost.title}</h1>
            <p>Author: {featuredPost.author}</p>
            <p>Date: {featuredPost.date}</p>
            <div className="flex items-center mt-2 ">
              <NavLink
                className="hover:bg-transparent"
                to={`/allposts/${featuredPost.id}`}
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
