const TimeAgo = require("javascript-time-ago");
const en = require("javascript-time-ago/locale/en");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

const MessageSchema = new Schema({
  message: { type: String, maxLength: 750, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

MessageSchema.virtual("formattedTimestamp").get(function () {
  return timeAgo.format(this.timestamp);
});

module.exports = mongoose.model("Message", MessageSchema);
