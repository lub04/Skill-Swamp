const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Importskill-related actions
const {
  browse,
  read,
  add,
  readOne,
  edit,
  destroy,
} = require("../../../controllers/skillActions");

router.get("/mine", readOne);
// Route to get a list ofskills
router.get("/", browse);

// Route to get a specificskill by ID
router.get("/:id", read);

// Route to add a newskill
router.post("/", add);

router.put("/:id", edit);

router.delete("/:id", destroy);

/* ************************************************************************* */

module.exports = router;
