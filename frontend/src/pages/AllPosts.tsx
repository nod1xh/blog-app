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
          <div className="mb-10 p-4" key={post._id}>
            <div className="flex justify-center">
              <img src={`http://localhost:5000/${post.image.src}`} alt="img" />
            </div>
            <h2 className="font-medium">{post.title}</h2>
            <div className="flex justify-between">
              <p className="text-gray-100">
                Author:
                <span className="font-semibold"> {post.author}</span>
              </p>
              <p className="text-gray-100">
                Date:
                <span className="font-semibold"> {post.date}</span>
              </p>
            </div>
            <div className="flex items-center mt-2 ">
              <NavLink
                className="bg-blue-500 hover:bg-blue-700 hover:text-black text-white font-bold py-2 px-4 rounded inline-block transition duration-300"
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
      <h1>
        Currently, there are no posts available. Would you like to create one?
        -&gt;
        <NavLink className="text-blue-500 text-2xl ml-4" to="/createpost">
          CREATE
        </NavLink>
      </h1>
    </div>
  );
}
