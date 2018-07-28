const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create Schema
const EducationSchema = new Schema({
  school: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date
  },
  current: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("educations", EducationSchema);
