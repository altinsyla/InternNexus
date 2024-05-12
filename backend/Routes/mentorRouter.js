const express = require("express");
const mentorController = require('../Controllers/mentorController');
const router = express.Router();

router.get('/', mentorController.getAllMentors);
router.get('/:id', mentorController.getSingleMentor);
router.post('/', mentorController.createMentor);
router.patch('/:id', mentorController.updateMentor);
router.delete('/:id', mentorController.deleteMentor);

module.exports = router;