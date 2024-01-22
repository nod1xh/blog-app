import { NavLink } from "react-router-dom";
import data from "../utilities/data";

export default function HomePage() {
  return (
    <div className="flex items-center justify-between mt-20 ">
      {data.map((data) => (
        <div className="border-2 border-black p-5" key={data.id}>
          <h1>{data.title}</h1>
          <p>{data.content}</p>
          <p>Author: {data.author}</p>
          <p>Date: {data.date}</p>
          <div className="flex items-center">
            <button className="border-black border-2 p-2 rounded-xl mt-4">
              <NavLink to="/post">View Post</NavLink>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
