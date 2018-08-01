const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ApplicationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  job: {
    type: Schema.Types.ObjectId,
    ref: "jobs"
  },
  body: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "pending"
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("applications", ApplicationSchema);
