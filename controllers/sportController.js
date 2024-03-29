const Sport = require("../models/Sport");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
    console.log(file);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createPrediction = async (req, res) => {
  const {
    time,
    tip,
    status,
    formationA,
    formationB,
    league,
    teamAPosition,
    teamBPosition,
    category,
    teamA,
    teamB,
    teamAscore,
    teamBscore,
    date,
  } = req.body;
  const sport = req.params.sport;

  const leagueIcon = req.files["leagueIcon"][0];
  const teamAIcon = req.files["teamAIcon"][0];
  const teamBIcon = req.files["teamBIcon"][0];

  // // Validate the presence of file fields
  if (!leagueIcon || !teamAIcon || !teamBIcon) {
    res.status(400).json({ error: "All image files are required" });
    return;
  }

  try {
    const result = await cloudinary.uploader.upload(leagueIcon.path, {
      crop: "scale",
    });

    const result2 = await cloudinary.uploader.upload(teamAIcon.path, {
      crop: "scale",
    });

    const result3 = await cloudinary.uploader.upload(teamBIcon.path, {
      crop: "scale",
    });

    const prediction = await Sport.create({
      time,
      tip,
      status,
      formationA,
      formationB,
      teamAPosition,
      teamBPosition,
      league,
      category,
      teamA,
      teamB,
      teamAscore,
      teamBscore,
      leagueIcon: result.secure_url,
      teamAIcon: result2.secure_url,
      teamBIcon: result3.secure_url,
      sport,
      date,
    });

    res.status(201).json({
      _id: prediction._id,
      time: prediction.time,
      tip: prediction.tip,
      status: prediction.status,
      formationA: prediction.formationA,
      formationB: prediction.formationB,
      teamA: prediction.teamA,
      teamB: prediction.teamB,
      teamAscore: prediction.teamAscore,
      teamBscore: prediction.teamBscore,
      teamAPosition: prediction.teamAPosition,
      teamBPosition: prediction.teamBPosition,
      leagueIcon: prediction.leagueIcon,
      teamAIcon: prediction.teamAIcon,
      teamBIcon: prediction.teamBIcon,
      league: prediction.league,
      sport: prediction.sport,
      category: prediction.category,
      date: prediction.date,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "An error occurred when creating the prediction",
      error,
    });
  }
};

const updatePrediction = async (req, res) => {
  const prediction = await Sport.findById(req.params.id);

  if (!prediction) {
    res
      .status(400)
      .json({ message: "The prediction you tried to update does not exist" });
  } else {
    const {
      time,
      tip,
      status,
      formationA,
      formationB,
      teamBPosition,
      teamAPosition,
      league,
      category,
      teamA,
      teamB,
      teamAscore,
      teamBscore,
      date,
    } = req.body;

    if (req.file) {
      // If a new image is uploaded, update it in Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        crop: "scale",
        quality: 60,
      });
      if (req.file.fieldname === "leagueIcon") {
        leagueIcon = result.secure_url;
      } else if (req.file.fieldname === "teamAIcon") {
        teamAIcon = result.secure_url;
      } else if (req.file.fieldname === "teamBIcon") {
        teamBIcon = result.secure_url;
      }
    }

    const updatedPrediction = await Sport.findByIdAndUpdate(
      req.params.id,
      {
        time,
        tip,
        status,
        formationA,
        formationB,
        leagueIcon,
        teamAIcon,
        teamBIcon,
        league,
        category,
        teamBPosition,
        teamAPosition,
        teamA,
        teamB,
        teamAscore,
        teamBscore,
        date,
      },
      { new: true }
    );

    res.status(200).json(updatedPrediction);
  }
};

const getPrediction = async (req, res) => {
  try {
    const prediction = await Sport.findOne({
      date: req.params.date,
      teamA: req.params.teamA,
      teamB: req.params.teamB,
    });
    if (!prediction) {
      return res.status(400).json({ message: "Prediction not found" });
    } else {
      res.status(200).json(prediction);
    }
  } catch (err) {
    console.log(err);
  }
};

const getPredictionFromSport = async (req, res) => {
  try {
    const predictions = await Sport.find({
      sport: decodeURIComponent(req.params.value),
      date: req.params.date,
    });
    if (!predictions) {
      return res.status(400).json({ message: "Prediction not found" });
    } else {
      res.status(200).json(predictions);
    }
  } catch (err) {
    console.log(err);
  }
};

const getPredictions = async (req, res) => {
  try {
    const predictions = await Sport.find({ date: req.params.date });
    if (!predictions) {
      return res
        .status(400)
        .json({ message: "There are no predictions found" });
    } else {
      res.status(200).json(predictions);
    }
  } catch (err) {
    console.log(err);
  }
};

const deletePrediction = async (req, res) => {
  try {
    const prediction = await Sport.findById(req.params.id);
    if (!prediction) {
      return res.status(404).json({ message: "Prediction not found" });
    }
    await Sport.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id, message: "Prediction deleted" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createPrediction,
  updatePrediction,
  getPrediction,
  getPredictionFromSport,
  getPredictions,
  deletePrediction,
};
