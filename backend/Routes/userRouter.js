const express = require("express");
const userController = require("../Controllers/userController");
// const verifyToken = require("../verifyToken");
const router = express.Router();

router.get("/",userController.getAllUsers);
router.get("/limit/:limit",userController.getcustomlimitusers);
router.get("/:username",userController.getSingleUser);
router.post("/",userController.createUser);
router.patch("/:id",userController.updateUser);
router.delete("/:id",userController.deleteUser);

module.exports = router;
