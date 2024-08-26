/* eslint-disable react-hooks/exhaustive-deps */
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const handleReserve = async () => {
    try {
      if (connectedUser.balance >= 10) {
        const newConnectedUserBalance = connectedUser.balance - 10;
        const newUserBalance = user.balance + 10;
        setConnectedUser((prev) => ({
          ...prev,
          balance: newConnectedUserBalance,
        }));
        setUser((prev) => ({
          ...prev,
          balance: newUserBalance,
        }));
        await connexion.put(`/api/credits/${connectedUser.id}`, {
          balance: newConnectedUserBalance,
        });
        await connexion.put(`/api/credits/${user.id}`, {
          balance: newUserBalance,
        });
        toast.success(
          `Votre réservation est validée par ${user.username} vous venez de lui envoyer 10 crédits. Il vous reste encore ${newConnectedUserBalance} crédits.`,
          {
            position: "bottom-center",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      } else {
        toast.error(
          `Vous n'avez pas suffisamment de crédits pour réserver une compétence chez ${user.username}, il serait temps de partager vos compétences avec d'autres utilisateurs pour recharger vos crédits !`,
          {
            position: "bottom-center",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
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
      <ToastContainer />
    </div>
  );
}

export default UserDetails;
