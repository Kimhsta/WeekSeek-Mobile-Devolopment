// utils/validators/watchLogValidator.js
const { body } = require("express-validator");

const createWatchLogValidator = [
  body("userId")
    .isInt()
    .withMessage("User ID must be an integer"),

  body("filmId")
    .isInt()
    .withMessage("Film ID must be an integer"),

  body("watchedAt")
    .optional()
    .isISO8601()
    .withMessage("watchedAt must be a valid ISO date"),
];

module.exports = { createWatchLogValidator };
