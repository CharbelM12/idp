import Joi from "joi";

const signupBody = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dateOfBirth: Joi.date().iso().required(),
  phoneNumber: Joi.string().required(),
};
const loginBody = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};
const updateProfile = {
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dateOfBirth: Joi.date().iso().required(),
  phoneNumber: Joi.string().required(),
};

const userValidation = {
  signup: {
    body: Joi.object().keys(signupBody),
  },
  login: {
    body: Joi.object().keys(loginBody),
  },
  updateProfile: {
    body: Joi.object().keys(updateProfile),
  },
};

export default userValidation;
