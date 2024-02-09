const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Message = require("../models/Message");

exports.profile_get = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: Profile GET");
});

exports.profileUpdate_get = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: Profile Update GET");
});

exports.profileUpdate_post = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: Profile Update POST");
});

exports.profileSecretCode_post = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: Profile Secret Code POST");
});
