const Admin = require("../models/Admin");
const asyncHandler = require("express-async-handler");
const multer = require("multer")
const moment = require("moment")
const cloudinary = require("cloudinary").v2

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
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const createPrediction = asyncHandler(async (req, res) => {
  const { time, tip, status, formationA, formationB, league, teamAPosition, teamBPosition, category, teamA, teamB, teamAscore, teamBscore, date } = req.body;

  // const leagueIcon = req.files['leagueIcon'][0];
  // const teamAIcon = req.files['teamAIcon'][0];
  // const teamBIcon = req.files['teamBIcon'][0];

  // Validate the presence of file fields
  // if (!leagueIcon || !teamAIcon || !teamBIcon) {
  //   res.status(400).json({ error: "All image files are required" });
  //   return;
  // }

  try {
    // const result = await cloudinary.uploader.upload(leagueIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale',
    // });

    // const result2 = await cloudinary.uploader.upload(teamAIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale'
    // });

    // const result3 = await cloudinary.uploader.upload(teamBIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale'
    // });


    const prediction = await Admin.create({
      time, tip, status, league, category,teamA, teamB, category, teamAscore, teamBscore,date});

    res.status(201).json({
      _id: prediction._id,
      time: prediction.time,
      tip: prediction.tip,
      status: prediction.status,
      teamA: prediction.teamA,
      teamB: prediction.teamB,
      teamAscore: prediction.teamAscore,
      teamBscore: prediction. teamBscore,
      league: prediction.league,
      category: prediction.category,
      date: prediction.date
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred when creating the prediction" });
  }
});

const createVipPrediction = asyncHandler(async (req, res) => {
  const { time, tip, status, league, category, teamA, teamB, teamAscore, teamBscore, date } = req.body;
  const vip = req.params.vip

  // const leagueIcon = req.files['leagueIcon'][0];
  // const teamAIcon = req.files['teamAIcon'][0];
  // const teamBIcon = req.files['teamBIcon'][0];

  // // Validate the presence of file fields
  // if (!leagueIcon || !teamAIcon || !teamBIcon) {
  //   res.status(400).json({ error: "All image files are required" });
  //   return;
  // }

  try {
    // const result = await cloudinary.uploader.upload(leagueIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale',
    // });

    // const result2 = await cloudinary.uploader.upload(teamAIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale'
    // });

    // const result3 = await cloudinary.uploader.upload(teamBIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale'
    // });

    const prediction = await Admin.create({
      time, tip, status, league, category,teamA, teamB, teamAscore, teamBscore, vip,date, });

    res.status(201).json({
      _id: prediction._id,
      time: prediction.time,
      tip: prediction.tip,
      status: prediction.status,
      teamA: prediction.teamA,
      teamB: prediction.teamB,
      teamAscore: prediction.teamAscore,
      teamBscore: prediction. teamBscore,
      league: prediction.league,
      category: prediction.category,
      vip: prediction.vip, 
      date: prediction.date
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred when creating the prediction" });
  }
});

const createVipMegaPrediction = asyncHandler(async (req, res) => {
  const { time, tip, status, league, category, teamA, teamB, teamAscore, teamBscore, date } = req.body;
  const vipMega = req.params.vipMega

  // const leagueIcon = req.files['leagueIcon'][0];
  // const teamAIcon = req.files['teamAIcon'][0];
  // const teamBIcon = req.files['teamBIcon'][0];

  // Validate the presence of file fields
  // if (!leagueIcon || !teamAIcon || !teamBIcon) {
  //   res.status(400).json({ error: "All image files are required" });
  //   return;
  // }

  try {
    // const result = await cloudinary.uploader.upload(leagueIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale',
    // });

    // const result2 = await cloudinary.uploader.upload(teamAIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale'
    // });

    // const result3 = await cloudinary.uploader.upload(teamBIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale'
    // });

    const prediction = await Admin.create({
      time, tip, status, formationA, formationB, teamAPosition, teamBPosition, league, category,teamA, teamB, teamAscore, teamBscore, vipMega,date});

    res.status(201).json({
      _id: prediction._id,
      time: prediction.time,
      tip: prediction.tip,
      status: prediction.status,
      teamA: prediction.teamA,
      teamB: prediction.teamB,
      teamAscore: prediction.teamAscore,
      teamBscore: prediction. teamBscore,
      league: prediction.league,
      category: prediction.category,
      vipMega: prediction.vipMega, 
      date: prediction.date
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred when creating the prediction" });
  }
});

const createVipSinglePrediction = asyncHandler(async (req, res) => {
  const { time, tip, status, formationA, formationB, league, teamAPosition, teamBPosition, category, teamA, teamB, teamAscore, teamBscore, date } = req.body;
  const vipSingle = req.params.single

  const leagueIcon = req.files['leagueIcon'][0];
  const teamAIcon = req.files['teamAIcon'][0];
  const teamBIcon = req.files['teamBIcon'][0];

  // Validate the presence of file fields
  if (!leagueIcon || !teamAIcon || !teamBIcon) {
    res.status(400).json({ error: "All image files are required" });
    return;
  }

  try {
    const result = await cloudinary.uploader.upload(leagueIcon.path, {
      width: 500,
      height: 500,
      crop: 'scale',
    });

    const result2 = await cloudinary.uploader.upload(teamAIcon.path, {
      width: 500,
      height: 500,
      crop: 'scale'
    });

    const result3 = await cloudinary.uploader.upload(teamBIcon.path, {
      width: 500,
      height: 500,
      crop: 'scale'
    });

    const prediction = await Admin.create({
      time, tip, status, formationA, formationB, teamAPosition, teamBPosition, league, category,teamA, teamB, teamAscore, teamBscore, vipSingle,date,
      leagueIcon: result.secure_url,
      teamAIcon: result2.secure_url,
      teamBIcon: result3.secure_url
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
      teamBscore: prediction. teamBscore,
      teamAPosition: prediction.teamAPosition,
      teamBPosition: prediction.teamBPosition,
      league: prediction.league,
      category: prediction.category,
      leagueIcon: prediction.leagueIcon,
      teamAIcon: prediction.teamAIcon,
      teamBIcon: prediction.teamBIcon,
      vipSingle: prediction.vipSingle, 
      date: prediction.date
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred when creating the prediction" });
  }
});

const createVipInvestmentsPrediction = asyncHandler(async (req, res) => {
  const { time, tip, status, formationA, formationB, league, teamAPosition, teamBPosition, category, teamA, teamB, teamAscore, teamBscore, date } = req.body;
  const vipInvestments = req.params.vipInvestments

  // const leagueIcon = req.files['leagueIcon'][0];
  // const teamAIcon = req.files['teamAIcon'][0];
  // const teamBIcon = req.files['teamBIcon'][0];

  // // Validate the presence of file fields
  // if (!leagueIcon || !teamAIcon || !teamBIcon) {
  //   res.status(400).json({ error: "All image files are required" });
  //   return;
  // }

  try {
    // const result = await cloudinary.uploader.upload(leagueIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale',
    // });

    // const result2 = await cloudinary.uploader.upload(teamAIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale'
    // });

    // const result3 = await cloudinary.uploader.upload(teamBIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale'
    // });

    const prediction = await Admin.create({
      time, tip, status, formationA, formationB, teamAPosition, teamBPosition, league, category,teamA, teamB, teamAscore, teamBscore, vipInvestments,date});

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
      teamBscore: prediction. teamBscore,
      teamAPosition: prediction.teamAPosition,
      teamBPosition: prediction.teamBPosition,
      league: prediction.league,
      category: prediction.category,
      vipInvestments: prediction.vipInvestments, 
      date: prediction.date
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred when creating the prediction" });
  }
});

const createVipExpertPrediction = asyncHandler(async (req, res) => {
  const { time, tip, status, formationA, formationB, league, teamAPosition, teamBPosition, category, teamA, teamB, teamAscore, teamBscore, date } = req.body;
  const expert = req.params.expert

  if(!time || !teamA || !teamB || !teamAscore || !teamBscore || !league || !tip){
    return res.status(404).json({ error: "All fields are required" });
  }

  // const leagueIcon = req.files['leagueIcon'][0];
  // const teamAIcon = req.files['teamAIcon'][0];
  // const teamBIcon = req.files['teamBIcon'][0];

  // Validate the presence of file fields
  // if (!leagueIcon || !teamAIcon || !teamBIcon) {
  //   res.status(400).json({ error: "All image files are required" });
  //   return;
  // }

  try {
    // const result = await cloudinary.uploader.upload(leagueIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale',
    // });

    // const result2 = await cloudinary.uploader.upload(teamAIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale'
    // });

    // const result3 = await cloudinary.uploader.upload(teamBIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale'
    // });

    const prediction = await Admin.create({
      time, tip, status, league, category,teamA, teamB, teamAscore, teamBscore, expert,date});

    res.status(201).json({
      _id: prediction._id,
      time: prediction.time,
      tip: prediction.tip,
      status: prediction.status,
      teamA: prediction.teamA,
      teamB: prediction.teamB,
      teamAscore: prediction.teamAscore,
      teamBscore: prediction. teamBscore,
      league: prediction.league,
      category: prediction.category,
      expert: prediction.expert, 
      date: prediction.date
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred when creating the prediction" });
  }
});

const createBankerPrediction = asyncHandler(async (req, res) => {
  const { time, tip, status, formationA, formationB, league, teamAPosition, teamBPosition, category, teamA, teamB, teamAscore, teamBscore, date } = req.body;
  const banker = req.params.banker

  // const leagueIcon = req.files['leagueIcon'][0];
  // const teamAIcon = req.files['teamAIcon'][0];
  // const teamBIcon = req.files['teamBIcon'][0];

  // Validate the presence of file fields
  if (!time || !tip || !league || !teamA || !teamB || !teamAscore || !teamBscore || !date) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  try {
    // const result = await cloudinary.uploader.upload(leagueIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale',
    // });

    // const result2 = await cloudinary.uploader.upload(teamAIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale'
    // });

    // const result3 = await cloudinary.uploader.upload(teamBIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale'
    // });

    const prediction = await Admin.create({
      time, tip, status, league, category,teamA, teamB, teamAscore, teamBscore, banker,date,});

    res.status(201).json({
      _id: prediction._id,
      time: prediction.time,
      tip: prediction.tip,
      status: prediction.status,
      teamA: prediction.teamA,
      teamB: prediction.teamB,
      teamAscore: prediction.teamAscore,
      teamBscore: prediction. teamBscore,
      league: prediction.league,
      category: prediction.category,
      banker: prediction.banker, 
      date: prediction.date
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred when creating the prediction" });
  }
});

const createVipSupremePrediction = asyncHandler(async (req, res) => {
  const { time, tip, status, formationA, formationB, league, teamAPosition, teamBPosition, category, teamA, teamB, teamAscore, teamBscore, date } = req.body;
  const supreme = req.params.supreme

  // const leagueIcon = req.files['leagueIcon'][0];
  // const teamAIcon = req.files['teamAIcon'][0];
  // const teamBIcon = req.files['teamBIcon'][0];

  // Validate the presence of file fields
  // if (!leagueIcon || !teamAIcon || !teamBIcon) {
  //   res.status(400).json({ error: "All image files are required" });
  //   return;
  // }

  try {
    // const result = await cloudinary.uploader.upload(leagueIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale',
    // });

    // const result2 = await cloudinary.uploader.upload(teamAIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale'
    // });

    // const result3 = await cloudinary.uploader.upload(teamBIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale'
    // });

    const prediction = await Admin.create({
      time, tip, status, league, category,teamA, teamB, teamAscore, teamBscore, supreme,date,});

    res.status(201).json({
      _id: prediction._id,
      time: prediction.time,
      tip: prediction.tip,
      status: prediction.status,
      teamA: prediction.teamA,
      teamB: prediction.teamB,
      teamAscore: prediction.teamAscore,
      teamBscore: prediction. teamBscore,
      league: prediction.league,
      category: prediction.category,
      supreme: prediction.supreme, 
      date: prediction.date
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred when creating the prediction" });
  }
});

const createDailyTenPrediction = asyncHandler(async (req, res) => {
  const { time, tip, status, formationA, formationB, league, teamAPosition, teamBPosition, category, teamA, teamB, teamAscore, teamBscore, date } = req.body;
  const dailyTen = req.params.dailyTen

  // const leagueIcon = req.files['leagueIcon'][0];
  // const teamAIcon = req.files['teamAIcon'][0];
  // const teamBIcon = req.files['teamBIcon'][0];

  // Validate the presence of file fields
  // if (!leagueIcon || !teamAIcon || !teamBIcon) {
  //   res.status(400).json({ error: "All image files are required" });
  //   return;
  // }

  try {
    // const result = await cloudinary.uploader.upload(leagueIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale',
    // });

    // const result2 = await cloudinary.uploader.upload(teamAIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale'
    // });

    // const result3 = await cloudinary.uploader.upload(teamBIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale'
    // });

    const prediction = await Admin.create({
      time, tip, status,  league, category,teamA, teamB, teamAscore, teamBscore, dailyTen,date});

    res.status(201).json({
      _id: prediction._id,
      time: prediction.time,
      tip: prediction.tip,
      status: prediction.status,
      teamA: prediction.teamA,
      teamB: prediction.teamB,
      teamAscore: prediction.teamAscore,
      teamBscore: prediction. teamBscore,
      league: prediction.league,
      category: prediction.category,
      dailyTen: prediction.dailyTen, 
      date: prediction.date
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred when creating the prediction" });
  }
});

const createSinglePrediction = asyncHandler(async (req, res) => {
  const { time, tip, status, formationA, formationB, league, teamAPosition, teamBPosition, category, teamA, teamB, teamAscore, teamBscore, date } = req.body;
  const single = req.params.single

  const leagueIcon = req.files['leagueIcon'][0];
  const teamAIcon = req.files['teamAIcon'][0];
  const teamBIcon = req.files['teamBIcon'][0];

  // Validate the presence of file fields
  if (!leagueIcon || !teamAIcon || !teamBIcon) {
    res.status(400).json({ error: "All image files are required" });
    return;
  }

  try {
    const result = await cloudinary.uploader.upload(leagueIcon.path, {
      width: 500,
      height: 500,
      crop: 'scale',
    });

    const result2 = await cloudinary.uploader.upload(teamAIcon.path, {
      width: 500,
      height: 500,
      crop: 'scale'
    });

    const result3 = await cloudinary.uploader.upload(teamBIcon.path, {
      width: 500,
      height: 500,
      crop: 'scale'
    });

    const prediction = await Admin.create({
      time, tip, status, formationA, formationB, teamAPosition, teamBPosition, league, category,teamA, teamB, teamAscore, teamBscore, single,date,
      leagueIcon: result.secure_url,
      teamAIcon: result2.secure_url,
      teamBIcon: result3.secure_url
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
      teamBscore: prediction. teamBscore,
      teamAPosition: prediction.teamAPosition,
      teamBPosition: prediction.teamBPosition,
      league: prediction.league,
      category: prediction.category,
      leagueIcon: prediction.leagueIcon,
      teamAIcon: prediction.teamAIcon,
      teamBIcon: prediction.teamBIcon,
      single: prediction.single, 
      date: prediction.date
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred when creating the prediction" });
  }
});

const createFreeTip = asyncHandler(async (req, res) => {
  const { time, tip, status,  league, category, teamA, teamB, teamAscore, teamBscore, date } = req.body;
  const freeTip = req.params.freeTip

  // const leagueIcon = req.files['leagueIcon'][0];
  // const teamAIcon = req.files['teamAIcon'][0];
  // const teamBIcon = req.files['teamBIcon'][0];

  // Validate the presence of file fields
  // if (!leagueIcon || !teamAIcon || !teamBIcon) {
  //   res.status(400).json({ error: "All image files are required" });
  //   return;
  // }

  try {
    // const result = await cloudinary.uploader.upload(leagueIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale',
    // });

    // const result2 = await cloudinary.uploader.upload(teamAIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale'
    // });

    // const result3 = await cloudinary.uploader.upload(teamBIcon.path, {
    //   width: 500,
    //   height: 500,
    //   crop: 'scale'
    // });

    const prediction = await Admin.create({
      time, tip, status, league, category,teamA, teamB, teamAscore, teamBscore, freeTip,date,});

    res.status(201).json({
      _id: prediction._id,
      time: prediction.time,
      tip: prediction.tip,
      status: prediction.status,
      teamA: prediction.teamA,
      teamB: prediction.teamB,
      teamAscore: prediction.teamAscore,
      teamBscore: prediction. teamBscore,
      league: prediction.league,
      category: prediction.category,
      freeTip: prediction.freeTip,
      date: prediction.date
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred when creating the prediction" });
  }
});

const createUpcoming = asyncHandler(async (req, res) => {
  const { time, tip, status, formationA, formationB, league, teamAPosition, teamBPosition, category, teamA, teamB, teamAscore, teamBscore, date } = req.body;
  const upcoming = req.params.upcoming

  const leagueIcon = req.files['leagueIcon'][0];
  const teamAIcon = req.files['teamAIcon'][0];
  const teamBIcon = req.files['teamBIcon'][0];

  // Validate the presence of file fields
  if (!leagueIcon || !teamAIcon || !teamBIcon) {
    res.status(400).json({ error: "All image files are required" });
    return;
  }

  try {
    const result = await cloudinary.uploader.upload(leagueIcon.path, {
      width: 500,
      height: 500,
      crop: 'scale',
    });

    const result2 = await cloudinary.uploader.upload(teamAIcon.path, {
      width: 500,
      height: 500,
      crop: 'scale'
    });

    const result3 = await cloudinary.uploader.upload(teamBIcon.path, {
      width: 500,
      height: 500,
      crop: 'scale'
    });

    const prediction = await Admin.create({
      time, tip, status, formationA, formationB, teamAPosition, teamBPosition, league, category,teamA, teamB, teamAscore, teamBscore, upcoming, date,
      leagueIcon: result.secure_url,
      teamAIcon: result2.secure_url,
      teamBIcon: result3.secure_url
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
      teamBscore: prediction. teamBscore,
      teamAPosition: prediction.teamAPosition,
      teamBPosition: prediction.teamBPosition,
      league: prediction.league,
      category: prediction.category,
      leagueIcon: prediction.leagueIcon,
      teamAIcon: prediction.teamAIcon,
      teamBIcon: prediction.teamBIcon,
      upcoming: prediction.upcoming,
      date: prediction.date
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred when creating the prediction" });
  }
});

const createBetOfTheDay = asyncHandler(async (req, res) => {
  const { time, tip, status, formationA, formationB, league, teamAPosition, teamBPosition, category, teamA, teamB, teamAscore, teamBscore, date } = req.body;
  const betOfTheDay = req.params.betOfTheDay

  const leagueIcon = req.files['leagueIcon'][0];
  const teamAIcon = req.files['teamAIcon'][0];
  const teamBIcon = req.files['teamBIcon'][0];

  // Validate the presence of file fields
  if (!leagueIcon || !teamAIcon || !teamBIcon) {
    res.status(400).json({ error: "All image files are required" });
    return;
  }

  try {
    const result = await cloudinary.uploader.upload(leagueIcon.path, {
      width: 500,
      height: 500,
      crop: 'scale',
    });

    const result2 = await cloudinary.uploader.upload(teamAIcon.path, {
      width: 500,
      height: 500,
      crop: 'scale'
    });

    const result3 = await cloudinary.uploader.upload(teamBIcon.path, {
      width: 500,
      height: 500,
      crop: 'scale'
    });

    const prediction = await Admin.create({
      time, tip, status, formationA, formationB, teamAPosition, teamBPosition, league, category,teamA, teamB, teamAscore, teamBscore, betOfTheDay, date,
      leagueIcon: result.secure_url,
      teamAIcon: result2.secure_url,
      teamBIcon: result3.secure_url
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
      teamBscore: prediction. teamBscore,
      teamAPosition: prediction.teamAPosition,
      teamBPosition: prediction.teamBPosition,
      league: prediction.league,
      category: prediction.category,
      leagueIcon: prediction.leagueIcon,
      teamAIcon: prediction.teamAIcon,
      teamBIcon: prediction.teamBIcon,
      betOfTheDay: prediction.betOfTheDay,
      date: prediction.date
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred when creating the prediction" });
  }
});



const updatePrediction = asyncHandler(async (req, res) => {
  const prediction = await Admin.findById(req.params.id);

  if (!prediction) {
    res.status(400);
    throw new Error("The prediction you tried to update does not exist");
  } else {
    const { time, tip, status, formationA, formationB, teamBPosition, teamAPosition, league, category, teamA, teamB, teamAscore, teamBscore, date } = req.body;
    const vip = req.params.vip
    let leagueIcon = prediction.leagueIcon;
    let teamAIcon = prediction.teamAIcon;
    let teamBIcon = prediction.teamBIcon;

    if (req.file) {
      // If a new image is uploaded, update it in Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        width: 500,
        height: 500,
        crop: "scale",
        quality: 60
      });
      if (req.file.fieldname === "leagueIcon") {
        leagueIcon = result.secure_url;
      } else if (req.file.fieldname === "teamAIcon") {
        teamAIcon = result.secure_url;
      } else if (req.file.fieldname === "teamBIcon") {
        teamBIcon = result.secure_url;
      }
    }

    const updatedPrediction = await Admin.findByIdAndUpdate(
      req.params.id,
      { time, tip, status, formationA, formationB, league, category, leagueIcon, teamAIcon, teamBIcon, teamBPosition, teamAPosition, teamA, teamB, teamAscore, teamBscore, vip, date },
      { new: true }
    );

    res.status(200).json(updatedPrediction);
  }
});

const getPrediction = asyncHandler(async (req, res) => {
  try {
    const prediction = await Admin.findById(req.params.id);
    if (!prediction) {
      res.status(400);
      throw new Error("This prediction does not exist");
    }else{
      res.status(200).json(prediction);
    }

  } catch (err) {
    console.log(err);
  }
});




const getVipPredictions = asyncHandler(async (req, res) => {
  try {
    // const date = req.params.date
    const predictions = await Admin.find({ vip: decodeURIComponent(req.params.value), date:req.params.date });
    if (!predictions) {
      res.status(400);
      throw new Error("Prediction not found");
    }else{
      res.status(200).json(predictions);
    }
  
  } catch (err) {
    console.log(err);
  }
});

// const getVipDates = asyncHandler(async (req, res) => {
//   try {
//     const { value } = req.params;
//     const predictions = await Admin.find({ date: value });
    
//     if (!predictions || predictions.length === 0) {
//       res.status(400);
//       throw new Error("Prediction not found");
//     }
    
//     res.status(200).json(predictions);
//   } catch (err) {
//     console.log(err);
//   }
// });



const getFreeTips= asyncHandler(async (req, res) => {
  try {
    const predictions = await Admin.find({freeTip: decodeURIComponent(req.params.value), date:req.params.date})
    if (!predictions) {
      res.status(400);
      throw new Error("Prediction not found");
    } else{
      res.status(200).json(predictions);
    }
  
} catch (err) {
console.log(err);        
}
})
// const getSingleFreetip = asyncHandler(async(req, res) => {
//   try {
//     const predictions = await Admin.find({freeTip: decodeURIComponent(req.params.value), id:req.params.id, date:req.params.date})
//     if (!predictions) {
//       res.status(400);
//       throw new Error("Prediction not found");
//     } else{
//       res.status(200).json(predictions);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// })

const getUpcoming = asyncHandler(async (req, res) => {
  try {
    const predictions = await Admin.find({ upcoming: decodeURIComponent(req.params.value), date:req.params.date });
    if (!predictions) {
      res.status(400);
      throw new Error("Prediction not found");
    }else{  
    res.status(200).json(predictions);
    }
  } catch (err) {
    console.log(err);
  }
});

const getSupreme = asyncHandler(async (req, res) => {
  try {
    const predictions = await Admin.find({ supreme: decodeURIComponent(req.params.value), date:req.params.date });
    if (!predictions) {
      res.status(400);
      throw new Error("Prediction not found");
    }else{  
    res.status(200).json(predictions);
    }
  } catch (err) {
    console.log(err);
  }
});

const getVipMega = asyncHandler(async (req, res) => {
  try {
    const predictions = await Admin.find({ vipMega: decodeURIComponent(req.params.value), date:req.params.date });
    if (!predictions) {
      res.status(400);
      throw new Error("Prediction not found");
    }else{  
    res.status(200).json(predictions);
    }
  } catch (err) {
    console.log(err);
  }
});

const getVipDailyTen = asyncHandler(async (req, res) => {
  try {
    const predictions = await Admin.find({ dailyTen: decodeURIComponent(req.params.value), date:req.params.date });
    if (!predictions) {
      res.status(400);
      throw new Error("Prediction not found");
    }else{  
    res.status(200).json(predictions);
    }
  } catch (err) {
    console.log(err);
  }
});

const getBankerOfTheDay = asyncHandler(async (req, res) => {
  try {
    const predictions = await Admin.find({ banker: decodeURIComponent(req.params.value), date:req.params.date });
    if (!predictions) {
      res.status(400);
      throw new Error("Prediction not found");
    }else{  
    res.status(200).json(predictions);
    }
  } catch (err) {
    console.log(err);
  }
});

const getFreeExpert = asyncHandler(async (req, res) => {
  try {
    const predictions = await Admin.find({ expert: decodeURIComponent(req.params.value), date:req.params.date });
    if (!predictions) {
      res.status(400);
      throw new Error("Prediction not found");
    }else{  
    res.status(200).json(predictions);
    }
  } catch (err) {
    console.log(err);
  }
});


const getBetOfTheDay = asyncHandler(async (req, res) => {
  try {
    const predictions = await Admin.find({ betOfTheDay: decodeURIComponent(req.params.value), date:req.params.date });
    if (!predictions) {
      res.status(400);
      throw new Error("Prediction not found");
    }else{
      res.status(200).json(predictions);

    }
  
  } catch (err) {
    console.log(err);
  }
});


const getPredictionInCategory = asyncHandler(async (req, res) => {
  const predictions = await Admin.find({ category: decodeURIComponent(req.params.value), date:req.params.date });
  if (!predictions) {
    res.status(400);
    throw new Error("This prediction does not exist");
  }else{
    res.status(200).json(predictions);

  }
});


// const moment = require("moment");

const getPredictions = asyncHandler(async (req, res) => {
  try {
    const predictions = await Admin.find({date:req.params.date});
    if (!predictions) {
      res.status(400);
      throw new Error("There are no predictions");
    }else{
      res.status(200).json(predictions);

    }

    return;
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred when fetching predictions" });
  }
});


const deletePrediction = asyncHandler(async (req, res) => {
    try {
        const prediction = await Admin.findById(req.params.id)
        if (!prediction) {
            res.status(404);
            throw new Error("Prediction not found");
          }
        await Admin.findByIdAndDelete(req.params.id)
        res.status(200).json({id: req.params.id, message: "Prediction deleted"})
    return;
  } catch (err) {
        console.log(err);
    }
})

module.exports = {
    createPrediction, createVipPrediction, getFreeExpert,getBankerOfTheDay, getVipMega, getVipDailyTen, getSupreme, createFreeTip, createBetOfTheDay, createUpcoming, createVipSupremePrediction, createDailyTenPrediction, createSinglePrediction, createVipMegaPrediction, createBankerPrediction, createVipExpertPrediction, createVipSinglePrediction, createVipInvestmentsPrediction, updatePrediction, getPrediction, getBetOfTheDay,getUpcoming, getFreeTips, getVipPredictions, getPredictionInCategory, getPredictions, deletePrediction
}