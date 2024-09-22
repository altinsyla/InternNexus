const express = require("express");
const Internship = require("../Models/internshipModel");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

const getAllInternships = async (req, res) => {
  const { category, page = 1, limit = 10, sortOrder } = req.query;
  let query = {};

  if (category && category !== "all") {
    query.category = category;
  }

  const options = {
    skip: (page - 1) * limit,
    limit: parseInt(limit),
  };

  if (sortOrder) {
    options.sort = { registeredDate: sortOrder === "asc" ? 1 : -1 };
  }

  try {
    const internships = await Internship.find(query, null, options);
    const total = await Internship.countDocuments(query);
    res.status(200).json({ internships, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    res.status(404).json({ message: "Error fetching internships: " + error.message });
  }
};

const getSingleInternship = async (req, res) => {
  const { id } = req.params;
  try {
    const internship = await Internship.findById(id);
    if (!internship) {
      return res.status(404).json({ error: "Internship not found" });
    }
    res.json(internship);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
};

const createInternship = async (req, res) => {
  const {
    username,
    title,
    type,
    location,
    duration,
    requirements,
    offers,
    category,
    salary,
    topics,
  } = req.body;

  const image = req.file ? req.file.filename : "";

  try {
    const newInternship = await Internship.create({
      username,
      image,
      title,
      type,
      location,
      duration,
      requirements,
      offers,
      category,
      salary,
      topics,
    });

    res.status(201).json(newInternship);
  } catch (error) {
    res.status(500).json({ message: "Error creating internship: " + error.message });
  }
};

const updateInternship = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    type,
    location,
    duration,
    requirements,
    offers,
    category,
    salary,
    topics
  } = req.body;

  const updatedData = {
    title,
    type,
    location,
    duration,
    requirements,
    offers,
    category,
    salary,
    topics,
  };

  if (req.file) {
    updatedData.image = req.file.filename;
  }

  try {
    const updatedInternship = await Internship.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json(updatedInternship);
  } catch (error) {
    res.status(400).json({ message: "Error updating internship: " + error.message });
  }
};

const deleteInternship = async (req, res) => {
  const { id } = req.params;
  try {
    const internship = await Internship.findByIdAndDelete(id);
    if (!internship) {
      return res.status(404).json({ message: "Internship not found" });
    }
    res.status(204).json({ message: "Internship deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting internship: " + error.message });
  }
};

module.exports = {
  getAllInternships,
  getSingleInternship,
  createInternship,
  updateInternship,
  deleteInternship,
  upload,
};
