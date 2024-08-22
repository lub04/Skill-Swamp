import { useLoaderData } from "react-router-dom";

import "./AllUsers.css";
import UserCard from "../../components/UserCard/UserCard";

function AllUsers() {
  const users = useLoaderData();

  return (
    <div className="all-users">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
export default AllUsers;
