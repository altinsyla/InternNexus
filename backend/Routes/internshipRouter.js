const express = require("express");
const internshipController = require('../Controllers/internshipController');
const router = express.Router();

router.get('/', internshipController.getAllInternships);
router.get('/:id', internshipController.getSingleInternship);
router.post('/', internshipController.createInternship);
router.patch('/:id', internshipController.updateInternship);
router.delete('/:id', internshipController.deleteInternship);

module.exports = router;