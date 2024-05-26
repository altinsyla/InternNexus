const express = require("express");
const internshipApplicationController = require('../Controllers/internshipApplicationController');
const verifyToken = require('../verifyToken');
const router = express.Router();

router.get('/', verifyToken, internshipApplicationController.getAllInternshipApplications);
router.get('/:id', verifyToken,  internshipApplicationController.getSingleInternshipApplication);
router.post('/', verifyToken,  internshipApplicationController.createInternshipApplication);
router.patch('/:id', verifyToken,  internshipApplicationController.updateInternshipApplication);
router.delete('/:id', verifyToken, internshipApplicationController.deleteInternshipApplication);

module.exports = router;