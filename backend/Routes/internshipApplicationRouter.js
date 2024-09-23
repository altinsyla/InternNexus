const express = require("express");
const internshipApplicationController = require('../Controllers/internshipApplicationController');
const router = express.Router();

router.get('/', internshipApplicationController.getAllInternshipApplications);
router.get('/:id', internshipApplicationController.getSingleInternshipApplication);
router.get('/user/:id', internshipApplicationController.getUserApplicationsByUsername);
router.post('/', internshipApplicationController.upload.single('cv'), internshipApplicationController.createInternshipApplication);
router.patch('/:id', internshipApplicationController.upload.single('cv'), internshipApplicationController.updateInternshipApplication);
router.delete('/:id', internshipApplicationController.deleteInternshipApplication);

module.exports = router;
