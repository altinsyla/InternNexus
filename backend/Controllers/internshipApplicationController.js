const InternshipApplication = require('../Models/internshipApplicationModel');

const getAllInternshipApplications = async (req, res) => {
  try {
    const InternshipApplications = await InternshipApplication.find();
    res.status(200).json(InternshipApplications);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSingleInternshipApplication = async (req, res) => {
  const id = req.params.id;
  try {
    const InternshipApplication = await InternshipApplication.findOne({ _id: id });
    res.status(200).json(InternshipApplication);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createInternshipApplication = async (req, res) => {
    const {
        positionTitle,
        companyLogo,
        location,
        employmentType,
        duration,
        requirements,
        offerDetails,
        createdAt,
    } = req.body;
  
    console.log(req.body);
  
    // Check for required fields
    if (
      !positionTitle ||
      !companyLogo ||
      !location ||
      !employmentType ||
      !duration ||
      !requirements ||
      !offerDetails ||
      !createdAt 
    ) {
      return res.status(400).json({ message: "Required fields are missing" });
    }
  
    try {
      const existingInternshipApplicationByRoll = await InternshipApplication.findOne({ positionTitle });
      if (existingInternshipApplicationByRoll) {
        return res
          .status(409)
          .json({ message: "Internship Application with this title already exists" });
      }
  
      const newInternshipApplication = await InternshipApplication.create({
        positionTitle,
        companyLogo,
        location,
        employmentType,
        duration,
        requirements,
        offerDetails,
        createdAt
      });
  
      res.status(201).json(newInternshipApplication);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

const updateInternshipApplication = async (req, res) => {
  const id = req.params.id;
  try {
    const updateInternshipApplication = await this.updateInternshipApplication.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(200).json(updateInternshipApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteInternshipApplication = async (req, res) => {
  const id = req.params.id;
  try {
    await InternshipApplication.findOneAndDelete({ _id: id });
    res.status(204).json({ message: "Internship Application deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
    getAllInternshipApplications,
    getSingleInternshipApplication,
    createInternshipApplication,
    updateInternshipApplication,
    deleteInternshipApplication,
};
