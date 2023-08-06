const mongoose = require("mongoose");
const sportSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true
},
tip: {
    type: String,
},
status: {
    type: String
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
    type:String
},
teamBPosition: {
    type: String
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
league: {
    type: String
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
sport: {
  type: String
},
date: {
    type: String
}
},{timestamps: true})



const Sport = mongoose.model("Sport", sportSchema);

module.exports = Sport;
