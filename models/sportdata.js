const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema(
  {
    team: {
      type: Array,
      required: true,
    },
    league: {
      type: Array,
      required: true,
    },
    countries: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Team = mongoose.model("team", teamSchema);

module.exports = Team;
