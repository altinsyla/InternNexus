const express = require("express");
const skillsController = require("../Controllers/skillsController");
// const verifyToken = require("../verifyToken");
const router = express.Router();

router.get("/",skillsController.getAllSkills);
router.get("/:id",skillsController.getSingleSkill);
router.post("/",skillsController.createSkill);
router.patch("/:id",skillsController.updateSkill);
router.delete("/:id",skillsController.deleteSkill);

module.exports = router;
