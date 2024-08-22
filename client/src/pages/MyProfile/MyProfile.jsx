/* eslint-disable react/jsx-no-bind */
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";

import "./MyProfile.css";
import ProfileForm from "../../components/ProfileForm/ProfileForm";

Modal.setAppElement("#root");
function MyProfile() {
  const user = useLoaderData();
  const skills = user.skills.split(";");
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
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
          <p className="skill" key={skill}>
            {skill}
          </p>
        ))}
      </section>
      <button type="button" className="button" onClick={openModal}>
        Modifier le profil
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <button className="button-close" type="button" onClick={closeModal}>
          X
        </button>
        <h2>Modifier le profil</h2>
        <ProfileForm user={user} close={closeModal} />
      </Modal>
    </div>
  );
}

export default MyProfile;
