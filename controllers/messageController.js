const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Message = require("../models/Message");

exports.newMessage_get = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: New message GET");
});

exports.newMessage_post = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: New message POST");
});

exports.deleteMessage_post = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: Delete message POST");
});
