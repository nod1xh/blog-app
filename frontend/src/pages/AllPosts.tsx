import { useContext } from "react";
import { AllPostsContext } from "../context/allposts-context";
import { NavLink } from "react-router-dom";

export default function AllPosts() {
  const { allPosts } = useContext(AllPostsContext);

  return allPosts.length > 0 ? (
    <>
      <div className="font-semibold text-2xl text-center mt-10">
        <h1>All posts</h1>
      </div>
      <div className="flex justify-between items-center mt-10">
        {allPosts.map((allPosts) => (
          <div
            className="border-2 border-[#f1f5f9] rounded-lg p-2 mb-10 w-1/4"
            key={allPosts.id}
          >
            <div className="flex justify-center">
              <img
                src={`http://localhost:5000/${allPosts.image}`}
                alt="img"
                className="h-72"
              />
            </div>
            <h1 className="font-medium">{allPosts.title}</h1>
            <p>Author: {allPosts.author}</p>
            <p>Date: {allPosts.date}</p>
            <div className="flex items-center mt-2 ">
              <NavLink
                className="hover:bg-transparent"
                to={`/allposts/${allPosts.id}`}
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
