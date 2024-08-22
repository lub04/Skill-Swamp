import { useState } from "react";

import "./ProfileForm.css";

function ProfileForm({ user }) {
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
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <label>
        Pseudo :
        <input
          onChange={handleChange}
          value={profil.username}
          name="username"
          type="text"
        />
      </label>
      <label>
        Adresse mail :
        <input
          onChange={handleChange}
          value={profil.email}
          name="email"
          type="email"
        />
      </label>
      <label>
        Biographie :
        <textarea
          onChange={handleChange}
          value={profil.bio}
          name="bio"
          type="text"
        />
      </label>
      <label>
        Localisation :
        <input
          onChange={handleChange}
          value={profil.location}
          name="location"
          type="text"
        />
      </label>
      <button className="button" type="submit">
        Valider
      </button>
    </form>
  );
}

export default ProfileForm;
