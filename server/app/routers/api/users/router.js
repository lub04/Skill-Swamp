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

router.get("/mine", readOne);
// Route to get a list ofusers
router.get("/", browse);

// Route to get a specificuser by ID
router.get("/:id", read);

// Route to add a newuser
router.post("/", add);

router.put("/:id", edit);

/* ************************************************************************* */

module.exports = router;
