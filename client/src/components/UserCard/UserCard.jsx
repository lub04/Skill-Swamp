import { Link } from "react-router-dom";
import "./UserCard.css";

function UserCard({ user }) {
  return (
    <Link to={`${user.id}`} className="user-card">
      <img src={user.profile_picture} alt="" />
      <div>
        <h2>{user.username}</h2>
        <p>{user.skills}</p>
        <small>{user.location}</small>
      </div>
    </Link>
  );
}

export default UserCard;
