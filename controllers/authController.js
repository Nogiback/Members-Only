const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.login_get = function (req, res) {
  res.render("login", { user: req.user, title: "Nogi Club | Login" });
};

exports.login_post = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: Login POST");
});

exports.signup_get = function (req, res) {
  res.render("signup", { user: req.user, title: "Nogi Club | Sign Up" });
};

exports.signup_post = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: Signup POST");
});

exports.logout_post = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: Logout POST");
});
