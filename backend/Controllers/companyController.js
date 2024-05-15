const Company = require('../Models/companyModel');

//Sherben me i marr krejt Kompanite
const getAllCompanies = async (req, res) => {
  try {
    const Companies = await Company.find();
    res.status(200).json(Companies);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//Sherben me marr ni kompani t'vetme n'baze te id pra /:id ktu vendoset id e caktuar
const getSingleCompany = async (req, res) => {
  const id = req.params.id;
  try {
    const Company = await Company.findOne({ _id: id });
    res.status(200).json(Company);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Sherben me kriju ni kompani t're por e ka edhe nje proces qe kontrollon se a ekziston ndonje kompani ne baze te id, titullit apo qfardo qe vendosim
const createCompany = async (req, res) => {
  const {
      name,
      logoUrl,
      description,
      websiteUrl,
  } = req.body;

  console.log(req.body);

  // Check for required fields
  if (
    !name ||
    !logoUrl ||
    !description ||
    !websiteUrl 
  ) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    // Ktu kontrollohet a ka kompani me emer t'njejt 
    const existingCompanyByRoll = await Company.findOne({ name });
    if (existingCompanyByRoll) {
      return res
        .status(409)
        .json({ message: "Company with this name already exists" });
    }

    // Ktu n'baze te atributeve te dhena krijohet kompania
    const newCompany = await Company.create({
      name,
      logoUrl,
      description,
      websiteUrl
    });

    // Ktu vjen response ne qofte se eshte kriju apo ka error
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Kjo sherben me bo update ni kompani ne baze te id te caktuar
const updateCompany = async (req, res) => {
  const id = req.params.id;
  try {
    const updateCompany = await Company.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(updateCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Kjo sherben me fshi ni kompani ne baze te id se caktuar 
const deleteCompany = async (req, res) => {
  const id = req.params.id;
  try {
    await Company.findOneAndDelete({ _id: id });
    res.status(204).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllCompanies,
  getSingleCompany,
  createCompany,
  updateCompany,
  deleteCompany,
};
