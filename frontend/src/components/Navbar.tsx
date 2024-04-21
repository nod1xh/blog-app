import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { PostsContext } from "../context/posts-context";

import Dropdown from "./Dropdown";

export default function Navbar() {
  const { isLogged, handleLogout } = useContext(PostsContext);
  const { pathname } = useLocation();

  return (
    <header>
      <nav className="flex justify-between bg-white border-0 border-b border-solid border-b-slate-200 p-4 rounded-b-lg text-white shadow-md">
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
            {isLogged ? (
              <button className="btn" onClick={handleLogout}>
                Sign out
              </button>
            ) : (
              <NavLink
                to="signup"
                className={`${pathname === "/signup" && "active-link"}`}
              >
                Sign Up
              </NavLink>
            )}

            {isLogged ? (
              <div>
                <Dropdown />
              </div>
            ) : null}
          </ul>
        </div>
      </nav>
    </header>
  );
}
