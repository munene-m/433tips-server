const express = require('express')
const router = express.Router()
const multer = require("multer")
const upload = multer({ dest: 'uploads/'})
const { createPrediction, updatePrediction, getPrediction, getPredictionFromSport, getPredictions, deletePrediction } = require('../controllers/sportController')
const { protect } = require('../middleware/authMiddleware')

router.route("/create/:sport").post(protect, createPrediction);
router.route("/update/:id").put(protect, updatePrediction)
router.route("/prediction/:id").get(getPrediction)
router.route("/:date").get(getPredictions)
router.route("/sport/:value/:date").get(getPredictionFromSport)
router.route("/delete/:id").delete(protect, deletePrediction)

module.exports = router