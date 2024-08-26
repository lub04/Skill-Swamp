const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Importcredits-related actions
const { edit } = require("../../../controllers/creditActions");

router.put("/:id", edit);

/* ************************************************************************* */

module.exports = router;
