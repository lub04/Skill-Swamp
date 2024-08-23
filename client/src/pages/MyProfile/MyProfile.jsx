/* eslint-disable react/jsx-no-bind */
import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "react-modal";

import connexion from "../../services/connexion";
import "./MyProfile.css";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import SkillCard from "../../components/SkillCard/SkillCard";
import SkillForm from "../../components/SkillForm/SkillForm";

Modal.setAppElement("#root");

function MyProfile() {
  const user = useLoaderData();
  const [skills, setSkills] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [addSkillModalIsOpen, setAddSkillModalIsOpen] = useState(false);

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
          <img src={user.profile_picture} alt={user.username} />
          <small>{user.email}</small>
          <small>{user.location}</small>
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
            setSkills={setSkills}
            user={user}
          />
        ))}
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
        <ProfileForm user={user} close={closeModal} />
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
          id={user.id}
          setSkills={setSkills}
        />
      </Modal>
    </div>
  );
}

export default MyProfile;
