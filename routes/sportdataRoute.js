const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  postTeam,
  updateTeam,
  deleteTeam,
  getTeams,
  getTeam,
} = require("../controllers/sportdataController");
const router = express.Router();

router.route("/create").post(protect, postTeam);
router.route("/update/:id").put(protect, updateTeam);
router.route("/delete/:id").delete(protect, deleteTeam);
router.route("/").get(getTeams);
router.route("/:id").get(getTeam);

module.exports = router;
