import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { PostsContext } from "../context/posts-context";

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const username = localStorage.getItem("user");
  const { handleLogout } = useContext(PostsContext);

  function handleDropdown() {
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative inline-block">
      <div
        onClick={handleDropdown}
        className={`flex items-center hover:bg-[#74c0fc] rounded-md px-2 cursor-pointer ${
          isOpen ? "bg-[#74c0fc]" : ""
        }`}
      >
        <FontAwesomeIcon icon={faUser} color="#4a90e2" />
        <span className="ml-1 mr-2 text-[#4a5568] font-medium">{username}</span>
        <FontAwesomeIcon icon={faAngleDown} size="xs" />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full p-2 mt-1 bg-white border rounded-md text-[#4a5568]">
          <NavLink
            to="profile"
            className="block py-1 px-2 w-full hover:bg-[#74c0fc] rounded-md"
          >
            Profile
          </NavLink>
          <button
            className="block py-1 px-2 w-full hover:bg-[#74c0fc] rounded-md text-[#4a5568] font-medium text-left"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
