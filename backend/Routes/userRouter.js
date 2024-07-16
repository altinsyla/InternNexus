const express = require("express");
const userController = require("../Controllers/userController");
const tokenVerification = require("../verifyToken");
const upload = userController.upload; // Correctly import the upload middleware
const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/admin", userController.getAllUsersForDashboard);
router.get("/verifytoken", tokenVerification.verifyToken);
router.get("/limit/:limit", userController.getcustomlimitusers);
router.get("/:username", userController.getSingleUser);
router.post(
  "/",
  userController.upload.single("image"),
  userController.createUser
);

router.patch(
  "/:id",
  userController.upload.single("image"),
  userController.updateUser
);
router.delete("/:id", userController.deleteUser);

router.post("/login", userController.loginUser);

module.exports = router;
