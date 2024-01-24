import data from "../utilities/data";
import { NavLink } from "react-router-dom";

export default function AllPosts() {
  return (
    <>
      <div className="font-semibold text-2xl text-center mt-10">
        <h1>All Posts</h1>
      </div>
      <div className="flex justify-between items-center mt-10">
        {data.map((data) => (
          <div className="border-2 border-black p-2 mb-10 w-1/4" key={data.id}>
            <div className="flex justify-center">
              <img src={data.image} alt="img" className="h-72" />
            </div>
            <h1 className="font-medium">{data.title}</h1>
            <p>Author: {data.author}</p>
            <p>Date: {data.date}</p>
            <div className="flex items-center mt-2">
              <NavLink
                className="hover:bg-transparent"
                to={`/allposts/post/${data.id}`}
              >
                View Post
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
