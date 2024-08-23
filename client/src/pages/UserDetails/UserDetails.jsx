import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

import SkillCard from "../../components/SkillCard/SkillCard";

import connexion from "../../services/connexion";
import "./UserDetails.css";

function UserDetails() {
  const user = useLoaderData();
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await connexion.get(`api/skills?id=${user.id}`);
        setSkills(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSkills();
  }, [user.id]);

  return (
    <div className="details-user">
      <section className="identity-contact">
        <div className="img-contact">
          <img src={user.profile_picture} alt={user.username} />
          <p>{user.email}</p>
          <small>{user.location}</small>
        </div>
        <div className="name-bio">
          <h2>{user.username}</h2>
          <p>{user.bio}</p>
        </div>
      </section>
      <section className="skills">
        {skills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} user={user} />
        ))}
      </section>
    </div>
  );
}

export default UserDetails;
