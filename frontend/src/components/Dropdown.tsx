import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Dropdown() {
  const username = localStorage.getItem("user");

  return (
    <div>
      <FontAwesomeIcon icon={faUser} color="#4a90e2" />
      <span className="text-black">{username}</span>
    </div>
  );
}
