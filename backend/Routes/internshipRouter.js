const express = require("express");
const internshipController = require("../Controllers/internshipController");
const router = express.Router();

router.get("/", internshipController.getAllInternships);
router.get("/:id", internshipController.getSingleInternship);
router.get("/user/:id", internshipController.getHrInternships);
router.post(
  "/",
  internshipController.upload.single("image"),
  internshipController.createInternship
);
router.patch(
  "/:id",
  internshipController.upload.single("image"),
  internshipController.updateInternship
);
router.delete("/:id", internshipController.deleteInternship);

module.exports = router;

//upload.single('image') - ta mundson me ru ni foto me ni create.
