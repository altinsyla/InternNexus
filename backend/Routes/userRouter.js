const express = require("express");
const userController = require("../Controllers/userController");
const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getSingleUser);
router.post("/", userController.createUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/login", userController.loginUser);


module.exports = router;