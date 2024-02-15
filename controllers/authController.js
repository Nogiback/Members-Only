const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.login_get = function (req, res) {
  res.render("login", { user: req.user, title: "Nogi Club | Login" });
};

exports.login_post = [
  body("username", "Username must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const errorUser = new User({
      username: req.body.username,
      password: req.body.password,
    });
    if (!errors.isEmpty()) {
      res.render("login", { user: errorUser, errors: errors.array() });
      return;
    }
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.render("login", { user: errorUser, errorMessage: info.message });
        return;
      }
      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    })(req, res, next);
  }),
];

exports.signup_get = function (req, res) {
  res.render("signup", { user: req.user, title: "Nogi Club | Sign Up" });
};

exports.signup_post = [
  asyncHandler(async (req, res, next) => {
    const duplicate = await User.findOne({ username: req.body.username });
    const errorUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: req.body.password,
    });
    if (duplicate !== null) {
      res.render("signup", {
        user: errorUser,
        errors: [{ msg: "Username already exists." }],
      });
      return;
    }
    next();
  }),

  body("firstname", "First Name cannot be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("lastname", "Last Name cannot be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("username", "Username cannot be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("password", "Password cannot be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("confirmPassword", "Confirm password cannot be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("confirmPassword", "Passwords must match.")
    .custom((value, { req }) => value === req.body.password)
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
      });
      res.render("signup", { user: errorUser, errors: errors.array() });
      return;
    }
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: hashedPassword,
        roles: ["User"],
      });

      await user.save();
      passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/signup",
      })(req, res, next);
    });
  }),
];

exports.logout_post = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
