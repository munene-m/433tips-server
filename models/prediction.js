const mongoose = require("mongoose");
const predictionSchema = new mongoose.Schema(
  {
    time: {
      type: String,
    },
    tip: {
      type: String,
    },
    status: {
      type: String,
    },
    teamA: {
      type: String,
    },
    teamAscore: {
      type: Number,
    },
    teamBscore: {
      type: Number,
    },
    teamB: {
      type: String,
    },
    teamAPosition: {
      type: String,
    },
    teamBPosition: {
      type: String,
    },

    teamAIcon: {
      type: String,
    },
    teamBIcon: {
      type: String,
    },
    category: {
      type: String,
    },
    banker: {
      type: String,
      trim: true,
    },
    jackpot: {
      type: String,
    },
    supreme: {
      type: String,
      trim: true,
    },
    league: {
      type: String,
    },
    leagueIcon: {
      type: String,
    },
    formationA: {
      type: Array,
    },
    formationB: {
      type: Array,
    },
    vip: {
      type: String,
      trim: true,
    },
    vipMega: {
      type: String,
      trim: true,
    },
    vipInvestments: {
      type: String,
      trim: true,
    },
    vipSingle: {
      type: String,
      trim: true,
    },
    drawVip: {
      type: String,
      trim: true,
    },
    halftime: {
      type: String,
      trim: true,
    },
    expert: {
      type: String,
      trim: true,
    },
    dailyTen: {
      type: String,
      trim: true,
    },
    freeTip: {
      type: String,
      trim: true,
    },
    upcoming: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    jackpotName: {
      type: String,
    },
    betOfTheDay: {
      type: String,
      trim: true,
    },
    date: {
      type: String,
    },
    showScore: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Prediction = mongoose.model("Prediction", predictionSchema);

module.exports = Prediction;
