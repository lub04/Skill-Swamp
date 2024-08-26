const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().max(255).required(),
  description: Joi.string().required(),
  level: Joi.string().max(255).required(),
  user_id: Joi.number().required(),
  experience_years: Joi.number().required(),
});

const validateSkill = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  if (error == null) {
    next();
  } else {
    res.status(422).json({ validationErrors: error.details });
  }
};

module.exports = validateSkill;
