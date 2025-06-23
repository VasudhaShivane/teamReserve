const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
  bookedSlots: [
    {
      start: Date,
      end: Date,
      bookedBy: String
    }
  ]
});

module.exports = mongoose.model("Resource", resourceSchema);
