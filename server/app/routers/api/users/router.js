const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Importuser-related actions
const {
  browse,
  read,
  add,
  readOne,
  edit,
} = require("../../../controllers/userActions");
const validateUser = require("../../../services/validateUser");

router.get("/mine", readOne);
// Route to get a list ofusers
router.get("/", browse);

// Route to get a specificuser by ID
router.get("/:id", read);

// Route to add a newuser
router.post("/", add);

router.put("/:id", validateUser, edit);

/* ************************************************************************* */

module.exports = router;
