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
  createSinglePrediction,
  updatePrediction,
  getPrediction,
  getPredictions,
  getFreeTips,
  getVipPredictions,
  getPredictionInCategory,
  deletePrediction,
} = require("../controllers/predictionController");
const { protect } = require("../middleware/authMiddleware");

router.route("/:date").get(getPredictions);
router.route("/single/:id").get(getPrediction);
router.route("/tips/:value/:date").get(getFreeTips);
router.route("/vipPredictions/:value/:date").get(getVipPredictions);
router.route("/jackpot-predictions/:value/:date").get(getJackpot);
router
  .route("/create")
  .post(
    protect,
    upload.fields([
      { name: "leagueIcon" },
      { name: "teamAIcon" },
      { name: "teamBIcon" },
    ]),
    createPrediction
  );

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
