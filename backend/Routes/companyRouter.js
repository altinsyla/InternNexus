const express = require("express");
const companyController = require('../Controllers/companyController');
const router = express.Router();

router.get('/', companyController.getAllCompanies);
router.get('/:id', companyController.getSingleCompany);
router.post('/', companyController.createCompany);
router.patch('/:id', companyController.updateCompany);
router.delete('/:id', companyController.deleteCompany);

module.exports = router;