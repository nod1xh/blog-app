import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faAnglesDown } from "@fortawesome/free-solid-svg-icons";

export default function Dropdown() {
  const username = localStorage.getItem("user");

  return (
    <div className="hover:bg-[#74c0fc] rounded-md px-2 cursor-pointer">
      <FontAwesomeIcon icon={faUser} color="#4a90e2" />
      <span className="m-1 text-[#4a5568] font-medium ">{username}</span>
      <FontAwesomeIcon icon={faAnglesDown} size="2xs" />
    </div>
  );
}
