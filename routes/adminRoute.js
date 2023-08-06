const express = require('express')
const router = express.Router()
const multer = require("multer")
const upload = multer({ dest: 'uploads/'})
const { createPrediction, createVipPrediction, createFreeTip, createUpcoming, getFreeExpert, getVipDailyTen, getSupreme, getBankerOfTheDay, getVipMega, createVipSupremePrediction, createSinglePrediction, createDailyTenPrediction,createBetOfTheDay, createVipExpertPrediction,createVipSinglePrediction, createVipInvestmentsPrediction, createVipMegaPrediction, updatePrediction, getPrediction, getBetOfTheDay, getUpcoming, getPredictions,  getFreeTips, getVipPredictions, getPredictionInCategory, deletePrediction, createBankerPrediction } = require('../controllers/adminController')
const { protect } = require('../middleware/authMiddleware')

router.route("/:date").get(getPredictions)
router.route("/single/:id").get(getPrediction)
router.route("/tips/:value/:date").get(getFreeTips)
router.route("/vipPredictions/:value/:date").get(getVipPredictions)
router.route("/upcomingPredictions/:value/:date").get(getUpcoming)
router.route("/vipSupreme/:value/:date").get(getSupreme)
router.route("/vipMega/:value/:date").get(getVipMega)
router.route("/bet/:value/:date").get(getBetOfTheDay)
router.route("/bankerPrediction/:value/:date").get(getBankerOfTheDay)
router.route("/daily-ten-prediction/:value/:date").get(getVipDailyTen)
router.route("/free-expert/:value/:date").get(getFreeExpert)
router.route("/create").post(
    protect, createPrediction
  );

  router.route("/create/:vip").post(
    protect, createVipPrediction
  );

  router.route("/create/mega/:vipMega").post(
    protect, createVipMegaPrediction
  );

  router.route("/create/freeExpert/:expert").post(protect, createVipExpertPrediction);

  router.route("/create/daily/:dailyTen").post(
    protect, createDailyTenPrediction
  );

  router.route("/create/supremeVip/:supreme").post(
    protect,  createVipSupremePrediction
  );

  router.route("/create/singleTip/:single").post(
    protect, upload.fields([
      { name: 'leagueIcon' },
      { name: 'teamAIcon' },
      { name: 'teamBIcon' },
    ]), createSinglePrediction
  );

  router.route("/create/banker-predictions/:banker").post(
    protect,  createBankerPrediction
  );

  router.route("/create/investments/:vipInvestments").post(
    protect,  createVipInvestmentsPrediction
  );

  router.route("/create/singleVip/:single").post(
    protect, createVipSinglePrediction
  );

  router.route("/create/tip/:freeTip").post(
    protect, createFreeTip
  );

  router.route("/create/upcoming/:upcoming").post(
    protect, upload.fields([
      { name: 'leagueIcon' },
      { name: 'teamAIcon' },
      { name: 'teamBIcon' },
    ]), createUpcoming
  );

  router.route("/create/bet/:betOfTheDay").post(
    protect, upload.fields([
      { name: 'leagueIcon' },
      { name: 'teamAIcon' },
      { name: 'teamBIcon' },
    ]), createBetOfTheDay
  );
  
router.route("/update/:id").put(protect, upload.fields([
    { name: 'leagueIcon' },
    { name: 'teamAIcon' },
    { name: 'teamBIcon' },
  ]), updatePrediction)
router.route("/delete/:id").delete(protect, deletePrediction)
router.route("/prediction/:value/:date").get(getPredictionInCategory)

module.exports = router