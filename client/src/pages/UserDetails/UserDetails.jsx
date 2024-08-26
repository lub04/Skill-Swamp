/* eslint-disable react-hooks/exhaustive-deps */
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

import SkillCard from "../../components/SkillCard/SkillCard";

import { useSkillSwamp } from "../../context/SkillSwampContext";
import connexion from "../../services/connexion";
import "./UserDetails.css";

function UserDetails() {
  const userLoad = useLoaderData();
  const [user, setUser] = useState(userLoad);
  const { connectedUser, setConnectedUser } = useSkillSwamp();
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

  useEffect(() => {
    const fetchConnectedUser = async () => {
      try {
        const response = await connexion.get(`api/users/mine`);
        setConnectedUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchConnectedUser();
  }, []);

  const handleReserve = () => {
    setConnectedUser((prev) => ({
      ...prev,
      balance: connectedUser.balance - 10,
    }));
    setUser((prev) => ({
      ...prev,
      balance: user.balance + 10,
    }));
  };
  return (
    <div className="details-user">
      <section className="identity-contact">
        <div className="img-contact">
          <img src={user.profile_picture} alt={user.username} />
          <p>{user.email}</p>
          <small>{user.location}</small>
          <p className="button2">Crédits : {user.balance}</p>
        </div>
        <div className="name-bio">
          <h2>{user.username}</h2>
          <p>{user.bio}</p>
        </div>
      </section>
      <section className="skills">
        {skills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            user={user}
            handleReserve={handleReserve}
          />
        ))}
      </section>
    </div>
  );
}

export default UserDetails;
