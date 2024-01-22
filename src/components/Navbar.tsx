import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header>
      <nav className="flex justify-center bg-slate-100 border border-black p-5">
        <div>
          <h1>BlogApp</h1>
        </div>
        <div>
          <ul className="flex">
            <NavLink to="/allposts">All Posts</NavLink>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/createpost">Create Post</NavLink>
          </ul>
        </div>
      </nav>
    </header>
  );
}
