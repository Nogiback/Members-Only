const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Message = require("../models/Message");

exports.profile_get = asyncHandler(async (req, res, next) => {
  const user = await User.findOne(req.user).exec();

  res.render("profile", {
    title: "Nogi Club | Profile",
    user: user,
  });
});

exports.profileUpdate_get = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: Profile Update GET");
});

exports.profileUpdate_post = asyncHandler(async (req, res, next) => {
  res.send("NOT YET IMPLEMENTED: Profile Update POST");
});

exports.profileSecretCode_post = [
  body("secretcode", "Secret must not be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.render("profile", { user: req.user, errors: errors.array() });
      return;
    }

    if (
      req.body.secretcode !== process.env.SECRET_CODE &&
      req.body.secretcode !== process.env.ADMIN_CODE
    ) {
      res.render("profile", {
        title: "Nogi Club | Profile",
        user: req.user,
        incorrectStatus: { msg: "Incorrect secret code." },
      });
      return;
    }

    if (req.user && req.body.secretcode === process.env.ADMIN_CODE) {
      if (req.user.roles.includes("Admin")) {
        res.render("profile", {
          title: "Nogi Club | Profile",
          user: req.user,
          incorrectStatus: { msg: "Secret code already added." },
        });
        return;
      }
      req.user.roles.push("Admin");
      await req.user.save();
      res.locals.currentUser = req.user;
      res.render("profile", {
        title: "Nogi Club | Profile",
        user: req.user,
        success: { msg: "Admin code successful!" },
      });
      return;
    }

    if (req.user && req.body.secretcode === process.env.SECRET_CODE) {
      if (req.user.roles.includes("Club Member")) {
        res.render("profile", {
          title: "Nogi Club | Profile",
          user: req.user,
          incorrectStatus: { msg: "Secret code already added." },
        });
        return;
      }
      req.user.roles.push("Club Member");
      await req.user.save();
      res.locals.currentUser = req.user;
      res.render("profile", {
        title: "Nogi Club | Profile",
        user: req.user,
        success: { msg: "Secret code successful!" },
      });
      return;
    }
  }),
];
