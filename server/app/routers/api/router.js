const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const usersRouter = require("./users/router");

router.use("/users", usersRouter);

const skillsRouter = require("./skills/router");

router.use("/skills", skillsRouter);

/* ************************************************************************* */

module.exports = router;
