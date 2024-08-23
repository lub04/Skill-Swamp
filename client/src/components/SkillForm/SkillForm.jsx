import { useState } from "react";

import connexion from "../../services/connexion";
import "./SkillForm.css";

function SkillForm({ id, close, setSkills }) {
  const [skill, setSkill] = useState({
    name: "",
    description: "",
    user_id: id,
    level: "",
    experience_years: "",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSkill((prevSkill) => ({
      ...prevSkill,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await connexion.post(`/api/skills`, skill);
      const response = await connexion.get(`/api/skills?id=${id}`);
      setSkills(response.data);
      close();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <label>
        Compétence :
        <input
          onChange={handleChange}
          value={skill.name}
          name="name"
          type="text"
        />
      </label>
      <label>
        Niveau :
        <input
          onChange={handleChange}
          value={skill.level}
          name="level"
          type="text"
        />
      </label>
      <label>
        Description :
        <textarea
          onChange={handleChange}
          value={skill.description}
          name="description"
        />
      </label>
      <label>
        Années d'expérience :
        <input
          onChange={handleChange}
          value={skill.experience_years}
          name="experience_years"
          type="number"
        />
      </label>
      <button type="submit">Valider</button>
    </form>
  );
}

export default SkillForm;
