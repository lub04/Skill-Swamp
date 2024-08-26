/* eslint-disable react/jsx-no-bind */
import { useState, useEffect } from "react";
import Modal from "react-modal";

import { useSkillSwamp } from "../../context/SkillSwampContext";
import connexion from "../../services/connexion";
import "./MyProfile.css";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import SkillCard from "../../components/SkillCard/SkillCard";
import SkillForm from "../../components/SkillForm/SkillForm";

Modal.setAppElement("#root");

function MyProfile() {
  const [skills, setSkills] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [addSkillModalIsOpen, setAddSkillModalIsOpen] = useState(false);
  const { connectedUser, setConnectedUser } = useSkillSwamp();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await connexion.get(`api/users/mine`);
        setConnectedUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await connexion.get(
          `api/skills?id=${connectedUser.id}`
        );
        setSkills(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSkills();
  }, [connectedUser.id]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openAddSkillModal() {
    setAddSkillModalIsOpen(true);
  }

  function closeAddSkillModal() {
    setAddSkillModalIsOpen(false);
  }

  return (
    <div className="details-user">
      <section className="identity-contact">
        <div className="img-contact">
          <img
            src={connectedUser.profile_picture}
            alt={connectedUser.username}
          />
          <p>{connectedUser.email}</p>
          <small>{connectedUser.location}</small>
          <p className="button2">Crédits :{connectedUser.balance}</p>
        </div>
        <div className="name-bio">
          <h2>{connectedUser.username}</h2>
          <p>{connectedUser.bio}</p>
        </div>
      </section>

      <section className="skills">
        {skills.length !== 0 ? (
          skills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              setSkills={setSkills}
              user={connectedUser}
            />
          ))
        ) : (
          <h2>Vous n'avez pas de compétences à afficher</h2>
        )}
      </section>
      <div className="button-box">
        <button type="button" className="button" onClick={openAddSkillModal}>
          Ajouter une compétence
        </button>
        <button type="button" className="button" onClick={openModal}>
          Modifier le profil
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modifier le profil"
        className="Modal"
        overlayClassName="Overlay"
      >
        <button className="button-close" type="button" onClick={closeModal}>
          X
        </button>
        <h2>Modifier le profil</h2>
        <ProfileForm user={connectedUser} close={closeModal} />
      </Modal>

      <Modal
        isOpen={addSkillModalIsOpen}
        onRequestClose={closeAddSkillModal}
        contentLabel="Ajouter une compétence"
        className="Modal"
        overlayClassName="Overlay"
      >
        <button
          className="button-close button-add-skill"
          type="button"
          onClick={closeAddSkillModal}
        >
          X
        </button>
        <h2>Ajouter une compétence</h2>
        <SkillForm
          close={closeAddSkillModal}
          id={connectedUser.id}
          setSkills={setSkills}
        />
      </Modal>
    </div>
  );
}

export default MyProfile;
