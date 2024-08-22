import { Link } from "react-router-dom";
import "./UserCard.css";

function UserCard({ user }) {
  return (
    <Link to="utilisateurs/:id" className="user-card">
      <img src={user.profile_picture} alt="" />
      <div>
        <h3>{user.username}</h3>
        <p>{user.skills}</p>
        <small>{user.location}</small>
      </div>
    </Link>
  );
}

export default UserCard;
