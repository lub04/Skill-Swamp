// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (req, res, next) => {
  try {
    // Fetch all skills from the database
    const skills = await tables.skill.readAllByUser(req.query.id);

    // Respond with the skills in JSON format
    res.json(skills);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const readOne = async (req, res, next) => {
  try {
    // Appel de readMine pour récupérer l'utilisateur connecté
    const skill = await tables.skill.readMine();

    if (skill == null) {
      res.sendStatus(404);
    } else {
      res.json(skill);
    }
  } catch (err) {
    next(err);
  }
};
// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    // Fetch a specific skill from the database based on the provided ID
    const skill = await tables.skill.read(req.params.id);

    // If the skill is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the skill in JSON format
    if (skill == null) {
      res.sendStatus(404);
    } else {
      res.json(skill);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
// This operation is not yet implemented

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  // Extract the skill data from the request body
  const skill = req.body;

  try {
    // Insert the user into the database
    const insertId = await tables.skill.create(skill);
    const userSkill = {
      skill_id: insertId,
      user_id: skill.user_id, // Utilisez l'ID de l'utilisateur nouvellement créé
      level: skill.level, // Assurez-vous que les champs existent dans 'skill'
      experience_years: skill.experience_years, // Assurez-vous que les champs existent dans 'skill'
    };

    // Insérer le userSkill dans la base de données
    await tables.userSkill.create(userSkill);
    // Respond with HTTP 201 (Created) and the ID of the newly inserted user
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
const edit = async (req, res, next) => {
  // Extract the skill data from the request body and params
  const skill = { ...req.body, id: req.params.id };

  try {
    // Update the skill in the database
    await tables.skill.update(skill);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    // Delete the program from the database
    await tables.skill.delete(req.params.id);

    // Respond with HTTP 204 (No Content)
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};
// The D of BREAD - Destroy (Delete) operation
// This operation is not yet implemented

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  readOne,
};
