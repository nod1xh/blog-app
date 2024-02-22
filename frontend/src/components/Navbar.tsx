import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { PostsContext } from "../context/posts-context";

export default function Navbar() {
  const { isLogged, handleLogout } = useContext(PostsContext);
  const { pathname } = useLocation();

  return (
    <header>
      <nav className="flex justify-between bg-[#c9c9c9] p-4 rounded-b-lg text-white shadow-md">
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
          </ul>
        </div>
      </nav>
    </header>
  );
}
