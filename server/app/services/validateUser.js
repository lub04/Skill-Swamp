const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().max(255).required(),
  email: Joi.string().max(255).required(),
  bio: Joi.string().required(),
  location: Joi.string().max(255).required(),
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error == null) {
    next();
  } else {
    res.status(422).json({ validationErrors: error.details });
  }
};

module.exports = validateUser;
