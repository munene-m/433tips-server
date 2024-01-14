const Prediction = require("../models/prediction");
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

const handleImageUpload = async (imageFile) => {
  try {
    const result = await cloudinary.uploader.upload(imageFile.path);
    return result.secure_url;
  } catch (error) {
    console.error(error);
    throw new Error("Error uploading image");
  }
};

const createPrediction = async (req, res) => {
  const {
    time,
    tip,
    status,
    league,
    category,
    teamA,
    teamB,
    teamAscore,
    teamBscore,
    formationA,
    formationB,
    date,
  } = req.body;

  // if (!req.files) {
  //   res.status(400).json({ error: "No files uploaded" });
  //   return;
  // }
  const leagueIcon = req.files["leagueIcon"]
    ? req.files["leagueIcon"][0]
    : req.body["leagueIcon"];
  const teamAIcon = req.files["teamAIcon"]
    ? req.files["teamAIcon"][0]
    : req.body["teamAIcon"];
  const teamBIcon = req.files["teamBIcon"]
    ? req.files["teamBIcon"][0]
    : req.body["teamBIcon"];

  if (
    (req.files["leagueIcon"] ||
      req.files["teamAIcon"] ||
      req.files["teamBIcon"]) &&
    (!leagueIcon || !teamAIcon || !teamBIcon)
  ) {
    res.status(400).json({ error: "All image files are required" });
    return;
  }

  try {
    let leagueIconUrl, teamAIconUrl, teamBIconUrl;

    if (req.files["leagueIcon"]) {
      leagueIconUrl = await handleImageUpload(leagueIcon);
    } else {
      leagueIconUrl = leagueIcon;
      if (typeof leagueIconUrl !== "string") {
        return res.status(400).json({ error: "Invalid leagueIcon URL" });
      }
    }

    if (req.files["teamAIcon"]) {
      teamAIconUrl = await handleImageUpload(teamAIcon);
    } else {
      teamAIconUrl = teamAIcon;
      if (typeof teamAIconUrl !== "string") {
        return res.status(400).json({ error: "Invalid teamAIcon URL" });
      }
    }

    if (req.files["teamBIcon"]) {
      teamBIconUrl = await handleImageUpload(teamBIcon);
    } else {
      teamBIconUrl = teamBIcon;
      if (typeof teamBIconUrl !== "string") {
        return res.status(400).json({ error: "Invalid teamBIcon URL" });
      }
    }

    const prediction = await Prediction.create({
      time,
      tip,
      status,
      league,
      category,
      teamA,
      teamB,
      teamAscore,
      formationA,
      formationB,
      teamBscore,
      date,
      leagueIcon: leagueIconUrl,
      teamAIcon: teamAIconUrl,
      teamBIcon: teamBIconUrl,
    });

    res.status(201).json({ ...prediction.toObject() });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: "An error occurred when creating the prediction" });
  }
};

const createVipPrediction = async (req, res) => {
  const {
    time,
    tip,
    status,
    league,
    category,
    teamA,
    teamB,
    teamAscore,
    teamBscore,
    date,
    formationA,
    formationB,
  } = req.body;
  const vip = req.params.vip;

  const leagueIcon = req.files["leagueIcon"]
    ? req.files["leagueIcon"][0]
    : req.body["leagueIcon"];
  const teamAIcon = req.files["teamAIcon"]
    ? req.files["teamAIcon"][0]
    : req.body["teamAIcon"];
  const teamBIcon = req.files["teamBIcon"]
    ? req.files["teamBIcon"][0]
    : req.body["teamBIcon"];

  if (
    (req.files["leagueIcon"] ||
      req.files["teamAIcon"] ||
      req.files["teamBIcon"]) &&
    (!leagueIcon || !teamAIcon || !teamBIcon)
  ) {
    res.status(400).json({ error: "All image files are required" });
    return;
  }

  try {
    let leagueIconUrl, teamAIconUrl, teamBIconUrl;

    if (req.files["leagueIcon"]) {
      leagueIconUrl = await handleImageUpload(leagueIcon);
    } else {
      leagueIconUrl = leagueIcon;
      if (typeof leagueIconUrl !== "string") {
        return res.status(400).json({ error: "Invalid leagueIcon URL" });
      }
    }

    if (req.files["teamAIcon"]) {
      teamAIconUrl = await handleImageUpload(teamAIcon);
    } else {
      teamAIconUrl = teamAIcon;
      if (typeof teamAIconUrl !== "string") {
        return res.status(400).json({ error: "Invalid teamAIcon URL" });
      }
    }

    if (req.files["teamBIcon"]) {
      teamBIconUrl = await handleImageUpload(teamBIcon);
    } else {
      teamBIconUrl = teamBIcon;
      if (typeof teamBIconUrl !== "string") {
        return res.status(400).json({ error: "Invalid teamBIcon URL" });
      }
    }

    const prediction = await Prediction.create({
      time,
      tip,
      status,
      league,
      category,
      teamA,
      teamB,
      teamAscore,
      teamBscore,
      date,
      vip,
      formationA,
      formationB,
      leagueIcon: leagueIconUrl,
      teamAIcon: teamAIconUrl,
      teamBIcon: teamBIconUrl,
    });

    res.status(201).json({ ...prediction.toObject() });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: "An error occurred when creating the prediction" });
  }
};

const createJackpotPrediction = async (req, res) => {
  const {
    time,
    tip,
    status,
    league,
    category,
    country,
    jackpotName,
    teamA,
    teamB,
    teamAscore,
    teamBscore,
    formationA,
    formationB,
    date,
  } = req.body;
  const jackpot = req.params.jackpot;

  const leagueIcon = req.files["leagueIcon"]
    ? req.files["leagueIcon"][0]
    : req.body["leagueIcon"];
  const teamAIcon = req.files["teamAIcon"]
    ? req.files["teamAIcon"][0]
    : req.body["teamAIcon"];
  const teamBIcon = req.files["teamBIcon"]
    ? req.files["teamBIcon"][0]
    : req.body["teamBIcon"];

  if (
    (req.files["leagueIcon"] ||
      req.files["teamAIcon"] ||
      req.files["teamBIcon"]) &&
    (!leagueIcon || !teamAIcon || !teamBIcon)
  ) {
    res.status(400).json({ error: "All image files are required" });
    return;
  }

  // Validate the presence of file fields
  if (
    !time ||
    !tip ||
    !league ||
    !teamA ||
    !teamB ||
    !teamAscore ||
    !teamBscore ||
    !date
  ) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    let leagueIconUrl, teamAIconUrl, teamBIconUrl;

    if (req.files["leagueIcon"]) {
      leagueIconUrl = await handleImageUpload(leagueIcon);
    } else {
      leagueIconUrl = leagueIcon;
      if (typeof leagueIconUrl !== "string") {
        return res.status(400).json({ error: "Invalid leagueIcon URL" });
      }
    }

    if (req.files["teamAIcon"]) {
      teamAIconUrl = await handleImageUpload(teamAIcon);
    } else {
      teamAIconUrl = teamAIcon;
      if (typeof teamAIconUrl !== "string") {
        return res.status(400).json({ error: "Invalid teamAIcon URL" });
      }
    }

    if (req.files["teamBIcon"]) {
      teamBIconUrl = await handleImageUpload(teamBIcon);
    } else {
      teamBIconUrl = teamBIcon;
      if (typeof teamBIconUrl !== "string") {
        return res.status(400).json({ error: "Invalid teamBIcon URL" });
      }
    }

    const prediction = await Prediction.create({
      time,
      tip,
      status,
      league,
      category,
      teamA,
      teamB,
      teamAscore,
      teamBscore,
      date,
      jackpot,
      country,
      jackpotName,
      formationA,
      formationB,
      leagueIcon: leagueIconUrl,
      teamAIcon: teamAIconUrl,
      teamBIcon: teamBIconUrl,
    });

    res.status(201).json({ ...prediction.toObject() });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: "An error occurred when creating the prediction" });
  }
};

const createFreeTip = async (req, res) => {
  const {
    time,
    tip,
    status,
    league,
    category,
    teamA,
    teamB,
    teamAscore,
    teamBscore,
    formationA,
    formationB,
    date,
  } = req.body;
  const freeTip = req.params.freeTip;

  const leagueIcon = req.files["leagueIcon"]
    ? req.files["leagueIcon"][0]
    : req.body["leagueIcon"];
  const teamAIcon = req.files["teamAIcon"]
    ? req.files["teamAIcon"][0]
    : req.body["teamAIcon"];
  const teamBIcon = req.files["teamBIcon"]
    ? req.files["teamBIcon"][0]
    : req.body["teamBIcon"];

  if (
    (req.files["leagueIcon"] ||
      req.files["teamAIcon"] ||
      req.files["teamBIcon"]) &&
    (!leagueIcon || !teamAIcon || !teamBIcon)
  ) {
    res.status(400).json({ error: "All image files are required" });
    return;
  }

  try {
    let leagueIconUrl, teamAIconUrl, teamBIconUrl;

    if (req.files["leagueIcon"]) {
      leagueIconUrl = await handleImageUpload(leagueIcon);
    } else {
      leagueIconUrl = leagueIcon;
      if (typeof leagueIconUrl !== "string") {
        return res.status(400).json({ error: "Invalid leagueIcon URL" });
      }
    }

    if (req.files["teamAIcon"]) {
      teamAIconUrl = await handleImageUpload(teamAIcon);
    } else {
      teamAIconUrl = teamAIcon;
      if (typeof teamAIconUrl !== "string") {
        return res.status(400).json({ error: "Invalid teamAIcon URL" });
      }
    }

    if (req.files["teamBIcon"]) {
      teamBIconUrl = await handleImageUpload(teamBIcon);
    } else {
      teamBIconUrl = teamBIcon;
      if (typeof teamBIconUrl !== "string") {
        return res.status(400).json({ error: "Invalid teamBIcon URL" });
      }
    }

    const prediction = await Prediction.create({
      time,
      tip,
      status,
      league,
      category,
      teamA,
      teamB,
      teamAscore,
      teamBscore,
      date,
      freeTip,
      formationA,
      formationB,
      leagueIcon: leagueIconUrl,
      teamAIcon: teamAIconUrl,
      teamBIcon: teamBIconUrl,
    });

    res.status(201).json({ ...prediction.toObject() });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: "An error occurred when creating the prediction" });
  }
};

const updatePrediction = async (req, res) => {
  const prediction = await Prediction.findById(req.params.id);

  if (!prediction) {
    return res
      .status(400)
      .json({ message: "Prediction you tried to update does not exist" });
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
      showScore,
      date,
    } = req.body;
    const vip = req.params.vip;

    let leagueIcon = prediction.leagueIcon;
    let teamAIcon = prediction.teamAIcon;
    let teamBIcon = prediction.teamBIcon;

    if (req.files) {
      // Handle leagueIcon
      if (req.files["leagueIcon"]) {
        leagueIcon = await handleImageUpload(req.files["leagueIcon"][0]);
      }

      // Handle teamAIcon
      if (req.files["teamAIcon"]) {
        teamAIcon = await handleImageUpload(req.files["teamAIcon"][0]);
      }

      // Handle teamBIcon
      if (req.files["teamBIcon"]) {
        teamBIcon = await handleImageUpload(req.files["teamBIcon"][0]);
      }
    }

    const updatedPrediction = await Prediction.findByIdAndUpdate(
      req.params.id,
      {
        time,
        tip,
        status,
        formationA,
        formationB,
        league,
        category,
        leagueIcon,
        teamAIcon,
        teamBIcon,
        teamBPosition,
        teamAPosition,
        teamA,
        teamB,
        teamAscore,
        teamBscore,
        vip,
        date,
        showScore,
      },
      { new: true }
    );

    res.status(200).json(updatedPrediction);
  }
};

const getPrediction = async (req, res) => {
  try {
    const prediction = await Prediction.findOne({
      date: req.params.date,
      teamA: req.params.teamA,
      teamB: req.params.teamB,
    });
    if (!prediction) {
      return res.status(404).json({ message: "Prediction not found" });
    } else {
      res.status(200).json(prediction);
    }
  } catch (err) {
    console.log(err);
  }
};

const getVipPredictions = async (req, res) => {
  try {
    // const date = req.params.date
    const predictions = await Prediction.find({
      vip: decodeURIComponent(req.params.value),
      date: req.params.date,
    });
    if (!predictions) {
      return res.status(404).json({ message: "Prediction not found" });
    } else {
      res.status(200).json(predictions);
    }
  } catch (err) {
    console.log(err);
  }
};

const getFreeTips = async (req, res) => {
  try {
    const predictions = await Prediction.find({
      freeTip: decodeURIComponent(req.params.value),
      date: req.params.date,
    });
    if (!predictions) {
      return res.status(404).json({ message: "Prediction not found" });
    } else {
      res.status(200).json(predictions);
    }
  } catch (err) {
    console.log(err);
  }
};

const getUpcoming = async (req, res) => {
  try {
    const predictions = await Prediction.find({
      upcoming: decodeURIComponent(req.params.value),
      date: req.params.date,
    });
    if (!predictions) {
      return res.status(404).json({ message: "Prediction not found" });
    } else {
      res.status(200).json(predictions);
    }
  } catch (err) {
    console.log(err);
  }
};

const getJackpot = async (req, res) => {
  try {
    const predictions = await Prediction.find({
      jackpot: decodeURIComponent(req.params.value),
      date: req.params.date,
    });
    if (!predictions) {
      return res.status(404).json({ message: "Prediction not found" });
    } else {
      res.status(200).json(predictions);
    }
  } catch (err) {
    console.log(err);
  }
};

const getPredictionInCategory = async (req, res) => {
  const predictions = await Prediction.find({
    category: decodeURIComponent(req.params.value),
    date: req.params.date,
  });
  if (!predictions) {
    return res.status(404).json({ message: "This prediction does not exist" });
  } else {
    res.status(200).json(predictions);
  }
};

const getPredictions = async (req, res) => {
  try {
    const predictions = await Prediction.find({ date: req.params.date });
    if (!predictions) {
      return res
        .status(404)
        .json({ message: "There are no predictions found" });
    } else {
      res.status(200).json(predictions);
    }

    return;
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occurred when fetching predictions" });
  }
};

const deletePrediction = async (req, res) => {
  try {
    const prediction = await Prediction.findById(req.params.id);
    if (!prediction) {
      return res.status(404).json({ error: "Prediction not found" });
    }
    await Prediction.findByIdAndDelete(req.params.id);
    res.status(200).json({ id: req.params.id, message: "Prediction deleted" });
    return;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createPrediction,
  createVipPrediction,
  createJackpotPrediction,
  getJackpot,
  createFreeTip,
  updatePrediction,
  getPrediction,
  getUpcoming,
  getFreeTips,
  getVipPredictions,
  getPredictionInCategory,
  getPredictions,
  deletePrediction,
};
