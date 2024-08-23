import { useState } from "react";
import Modal from "react-modal";

import "./SkillCard.css";

function SkillCard({ skill }) {
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
      </Modal>
    </div>
  );
}

export default SkillCard;
