const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const Message = require("../models/Message");

exports.newMessage_get = function (req, res) {
  res.render("newMessage", {
    user: req.user,
    title: "Nogi Club | Add New Message",
  });
};

exports.newMessage_post = [
  body("message").trim().isLength({ min: 1 }).escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("newMessage", { user: req.user, errors: errors.array() });
      return;
    }

    const user = await User.findById(req.user._id);
    const newMessage = new Message({
      message: req.body.message,
      user: user,
    });

    await newMessage.save();
    res.redirect("/");
  }),
];

exports.deleteMessage_post = asyncHandler(async (req, res, next) => {
  await Message.findByIdAndDelete(req.body.messageID);
  res.redirect("/");
});
