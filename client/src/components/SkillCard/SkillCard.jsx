import { useState } from "react";

import Modal from "react-modal";

import connexion from "../../services/connexion";
import "./SkillCard.css";

function SkillCard({ skill, setSkills, user }) {
  const [modalState, setModalState] = useState({});

  const openModal = (skillId) => {
    setModalState((prev) => ({
      ...prev,
      [skillId]: true,
    }));
  };

  const closeModal = (skillId) => {
    setModalState((prev) => ({
      ...prev,
      [skillId]: false,
    }));
  };
  const handleDelete = async () => {
    try {
      await connexion.delete(`/api/skills/${skill.id}`);
      const response = await connexion.get(`/api/skills?id=${user.id}`);
      setSkills(response.data);

      closeModal(skill.id);
    } catch (error) {
      console.error("Erreur lors de la suppression du produit:", error);
    }
  };

  return (
    <div className="skill">
      <button
        className="button-skill"
        onClick={() => openModal(skill.id)}
        type="button"
      >
        {skill.name} : {skill.level}
      </button>
      <Modal
        isOpen={modalState[skill.id] || false}
        onRequestClose={() => closeModal(skill.id)}
        contentLabel="Example Modal"
        className="Modal-skill"
        overlayClassName="Overlay"
      >
        <button
          className="button-close"
          type="button"
          onClick={() => closeModal(skill.id)}
        >
          X
        </button>
        <h2>
          {skill.name} : {skill.level}
        </h2>
        <p>{skill.description}</p>
        <p>Experience : {skill.experience_years} ans</p>
        <button type="button" className="button" onClick={handleDelete}>
          Delete
        </button>
      </Modal>
    </div>
  );
}

export default SkillCard;
