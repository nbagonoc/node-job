const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create Schema
const JobPostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  applicants: [
    {
      type: Schema.Types.ObjectId,
      ref: "applications"
    }
  ]
});

module.exports = mongoose.model("jobs", JobPostSchema);
