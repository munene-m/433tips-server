const express = require("express");
const {
  loginUser,
  registerUser,
  registerAdmin,
  getCredentials,
  getUser,
  getUsers,
  getVipUsers,
  deleteUser,
  changeUserPassword,
  requestPasswordReset,
  updateUser,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getUsers);
router.route("/:id").get(protect, getUser);
router.route("/credentials").get(protect, getCredentials);
router.route("/getVip").get(protect, getVipUsers);
// router.route("/googleCredentials").get(redirectUser)
router.route("/register").post(registerUser);
router.route("/register-admin").post(registerAdmin);
router.route("/login").post(loginUser);
router.route("/update/:id").put(updateUser);
router.route("/request-reset").post(requestPasswordReset);
router.route("/change-password").post(changeUserPassword);
// router.route("/auth/google").get(loginWithGoogle)
// router.route("/auth/google/callback").get(googleAuthCallback);
router.route("/delete/:id").delete(protect, deleteUser);

module.exports = router;
