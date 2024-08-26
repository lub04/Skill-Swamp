import { useState } from "react";

import { useSkillSwamp } from "../../context/SkillSwampContext";
import connexion from "../../services/connexion";
import "./ProfileForm.css";

function ProfileForm({ user, close }) {
  const { setConnectedUser, connectedUser } = useSkillSwamp();
  const [profil, setProfil] = useState({
    username: user.username,
    email: user.email,
    bio: user.bio,
    location: user.location,
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfil((prevProfil) => ({
      ...prevProfil,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await connexion.put(`/api/users/${user.id}`, profil);
      const newProfile = await connexion.get(`/api/users/${user.id}`);
      setConnectedUser({ ...connectedUser, ...newProfile.data });
      close();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
      <label>
        Pseudo :
        <input
          onChange={handleChange}
          value={profil.username}
          name="username"
          type="text"
          required
        />
      </label>
      <label>
        Adresse mail :
        <input
          onChange={handleChange}
          value={profil.email}
          name="email"
          type="email"
          required
        />
      </label>
      <label>
        Biographie :
        <textarea
          onChange={handleChange}
          value={profil.bio}
          name="bio"
          type="text"
          required
        />
      </label>
      <label>
        Localisation :
        <input
          onChange={handleChange}
          value={profil.location}
          name="location"
          type="text"
          required
        />
      </label>
      <button className="button" type="submit">
        Valider
      </button>
    </form>
  );
}

export default ProfileForm;
