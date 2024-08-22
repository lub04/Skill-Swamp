const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Importuser-related actions
const { browse, read, add } = require("../../../controllers/userActions");

// Route to get a list ofusers
router.get("/", browse);

// Route to get a specificuser by ID
router.get("/:id", read);

// Route to add a newuser
router.post("/", add);

/* ************************************************************************* */

module.exports = router;
