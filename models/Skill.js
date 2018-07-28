const mongoose = require("mongoose");
const { Schema } = mongoose;

const SkillSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  // beginner, moderate, advance, professional
  rate: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("skills", SkillSchema);
