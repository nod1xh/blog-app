import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <nav className="flex justify-between bg-slate-100 border border-black p-5">
        <div>
          <NavLink
            className="text-2xl font-semibold border-none hover:bg-transparent"
            to="/"
          >
            BlogApp
          </NavLink>
        </div>
        <div>
          <ul className="flex">
            <NavLink to="/allposts">All Posts</NavLink>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/createpost">Create Post</NavLink>
            <NavLink to="signup">Sign Up</NavLink>
          </ul>
        </div>
      </nav>
    </header>
  );
}
