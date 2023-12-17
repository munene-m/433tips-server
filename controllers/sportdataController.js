const Team = require("../models/sportdata");

const postTeam = async (req, res) => {
  const { team, league, countries } = req.body;
  if (!team || !league || !countries) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const newTeam = await Team.create({
      team,
      league,
      countries,
    });

    if (newTeam) {
      res.status(201).json({
        _id: newTeam.id,
        team: newTeam.team,
        countries: newTeam.countries,
        league: newTeam.league,
      });
    } else {
      return res.status(400).json({ error: "An error occured" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "An error occurred", error });
  }
};

const updateTeam = async (req, res) => {
  const team = await Team.findById(req.params.id);
  if (!team) {
    return res.status(404).json({ error: "Team not found" });
  }
  try {
    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json(teams);
  } catch (error) {
    res.status(400).json(error);
  }
};

const getTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team data not found" });
    } else {
      res.status(200).json(team);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ error: "Not found" });
    }
    await Team.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "sport data deleted" });
  } catch (error) {
    res.status(400).json("An error occured", error);
  }
};
module.exports = { postTeam, updateTeam, deleteTeam, getTeam, getTeams };
