const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  createPrediction,
  createVipPrediction,
  createFreeTip,
  getJackpot,
  createJackpotPrediction,
  createVipSupremePrediction,
  createSinglePrediction,
  createDailyTenPrediction,
  createVipExpertPrediction,
  createVipMegaPrediction,
  updatePrediction,
  getPrediction,
  getBetOfTheDay,
  getPredictions,
  getFreeTips,
  getVipPredictions,
  getPredictionInCategory,
  deletePrediction,
  createBankerPrediction,
} = require("../controllers/predictionController");
const { protect } = require("../middleware/authMiddleware");

router.route("/:date").get(getPredictions);
router.route("/single/:id").get(getPrediction);
router.route("/tips/:value/:date").get(getFreeTips);
router.route("/vipPredictions/:value/:date").get(getVipPredictions);
router.route("/jackpot-predictions/:value/:date").get(getJackpot);
router.route("/bet/:value/:date").get(getBetOfTheDay);
router.route("/create").post(protect, createPrediction);

router
  .route("/create/:vip")
  .post(
    protect,
    upload.fields([
      { name: "leagueIcon" },
      { name: "teamAIcon" },
      { name: "teamBIcon" },
    ]),
    createVipPrediction
  );

router
  .route("/create/mega/:vipMega")
  .post(
    protect,
    upload.fields([
      { name: "leagueIcon" },
      { name: "teamAIcon" },
      { name: "teamBIcon" },
    ]),
    createVipMegaPrediction
  );

router
  .route("/create/freeExpert/:expert")
  .post(
    protect,
    upload.fields([
      { name: "leagueIcon" },
      { name: "teamAIcon" },
      { name: "teamBIcon" },
    ]),
    createVipExpertPrediction
  );

router
  .route("/create/daily/:dailyTen")
  .post(
    protect,
    upload.fields([
      { name: "leagueIcon" },
      { name: "teamAIcon" },
      { name: "teamBIcon" },
    ]),
    createDailyTenPrediction
  );

router
  .route("/create/supremeVip/:supreme")
  .post(
    protect,
    upload.fields([
      { name: "leagueIcon" },
      { name: "teamAIcon" },
      { name: "teamBIcon" },
    ]),
    createVipSupremePrediction
  );

router
  .route("/create/singleTip/:single")
  .post(
    protect,
    upload.fields([
      { name: "leagueIcon" },
      { name: "teamAIcon" },
      { name: "teamBIcon" },
    ]),
    createSinglePrediction
  );

router
  .route("/create/jackpot-prediction/:jackpot")
  .post(
    protect,
    upload.fields([
      { name: "leagueIcon" },
      { name: "teamAIcon" },
      { name: "teamBIcon" },
    ]),
    createJackpotPrediction
  );

router
  .route("/create/banker-predictions/:banker")
  .post(
    protect,
    upload.fields([
      { name: "leagueIcon" },
      { name: "teamAIcon" },
      { name: "teamBIcon" },
    ]),
    createBankerPrediction
  );

router
  .route("/create/tip/:freeTip")
  .post(
    protect,
    upload.fields([
      { name: "leagueIcon" },
      { name: "teamAIcon" },
      { name: "teamBIcon" },
    ]),
    createFreeTip
  );

router
  .route("/update/:id")
  .put(
    protect,
    upload.fields([
      { name: "leagueIcon" },
      { name: "teamAIcon" },
      { name: "teamBIcon" },
    ]),
    updatePrediction
  );
router.route("/delete/:id").delete(protect, deletePrediction);
router.route("/prediction/:value/:date").get(getPredictionInCategory);

module.exports = router;
