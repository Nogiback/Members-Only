const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: {
    type: [String],
    enum: ["User", "Club Member", "Admin"],
    required: true,
    default: "User",
  },
});

module.exports = mongoose.model("User", UserSchema);
