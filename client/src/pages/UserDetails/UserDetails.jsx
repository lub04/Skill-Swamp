import { useLoaderData } from "react-router-dom";
import "./UserDetails.css";

function UserDetails() {
  const user = useLoaderData();
  const skills = user.skills.split(";");
  return (
    <div className="details-user">
      <section className="identity-contact">
        <div className="img-contact">
          <img src={user.profile_picture} alt={user.username} />
          <small>{user.email}</small>
          <small>{user.location}</small>
        </div>
        <div className="name-bio">
          <h1>{user.username}</h1>
          <p>{user.bio}</p>
        </div>
      </section>
      <section className="skills">
        {skills.map((skill) => (
          <p key={skill}>{skill}</p>
        ))}
      </section>
    </div>
  );
}

export default UserDetails;
