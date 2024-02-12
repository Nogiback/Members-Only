const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");

// Require controllers and models
const authController = require("../controllers/authController");
const messageController = require("../controllers/messageController");
const userController = require("../controllers/userController");
const Message = require("../models/Message");
const User = require("../models/User");

/* GET home page. */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const messages = await Message.find()
      .sort({ timestamp: -1 })
      .limit(50)
      .populate("user")
      .exec();
    const user = await User.findOne(req.user).populate("roles").exec();
    res.render("index", {
      title: "Nogi Club",
      messages: messages,
      user: user,
    });
  })
);

/// ROUTES ///

router.get("/login", authController.login_get);
router.post("/login", authController.login_post);
router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);
router.post("/logout", authController.logout_post);
router.get("/newMessage", messageController.newMessage_get);
router.post("/newMessage", messageController.newMessage_post);
router.post("/deleteMessage", messageController.deleteMessage_post);

router.get("/profile", userController.profile_get);
router.get("/profile/update", userController.profileUpdate_get);
router.post("/profile/update", userController.profileUpdate_post);
router.post("/profile/secretCode", userController.profileSecretCode_post);

module.exports = router;
