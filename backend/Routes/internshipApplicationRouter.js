const express = require("express");
const internshipApplicationController = require('../Controllers/internshipApplicationController');
const router = express.Router();

router.get('/', internshipApplicationController.getAllInternshipApplications);
router.get('/:id', internshipApplicationController.getSingleInternshipApplication);
router.post('/', internshipApplicationController.createInternshipApplication);
router.patch('/:id', internshipApplicationController.updateInternshipApplication);
router.delete('/:id', internshipApplicationController.deleteInternshipApplication);

module.exports = router;