const mongoose = require("mongoose");

const FacilitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Facility", FacilitySchema);
