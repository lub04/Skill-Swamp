// Import access to database tables
const tables = require("../../database/tables");

const edit = async (req, res, next) => {
  // Extract the credits data from the request body and params
  const credits = { ...req.body, id: req.params.id };

  try {
    // Update the credits in the database
    await tables.credits.update(credits);

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
  // browse,
  // read,
  edit,
  // add,
  // destroy,
  // readOne,
};
