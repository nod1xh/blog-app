import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { PostsContext } from "../context/posts-context";

import Dropdown from "./Dropdown";

export default function Navbar() {
  const { isLogged } = useContext(PostsContext);
  const { pathname } = useLocation();

  return (
    <header>
      <nav className="flex justify-between bg-white border-0 border-b border-solid border-b-slate-200 px-4 py-6 rounded-b-lg text-white shadow-md">
        <div>
          <NavLink
            className="text-2xl font-bold border-none hover:bg-transparent "
            to="/"
          >
            BlogApp
          </NavLink>
        </div>
        <div>
          <ul className="flex">
            <NavLink to="/" className={`${pathname === "/" && "active-link"}`}>
              Home
            </NavLink>
            <NavLink
              to="/allposts"
              className={`${pathname === "/allposts" && "active-link"}`}
            >
              All Posts
            </NavLink>

            {isLogged && (
              <NavLink
                to="/createpost"
                className={`${pathname === "/createpost" && "active-link"}`}
              >
                Create Post
              </NavLink>
            )}
            {!isLogged && (
              <NavLink
                to="signup"
                className={`${pathname === "/signup" && "active-link"}`}
              >
                Sign Up
              </NavLink>
            )}
          </ul>
        </div>
        {isLogged ? (
          <div>
            <Dropdown />
          </div>
        ) : null}
      </nav>
    </header>
  );
}
