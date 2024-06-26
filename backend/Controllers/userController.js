const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const { model } = require("mongoose");
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

const upload = multer({
  storage: storage,
});

const getAllUsers = async (req, res) => {
  const { username, fullname } = req.query;

  let query = {};

  if (username) {
    query.username = { $regex: new RegExp(username, "i") };
  }

  if (fullname) {
    query.fullname = { $regex: new RegExp(fullname, "i") };
  }

  try {
    const Users = await User.find(query).populate("skills");
    res.status(200).json(Users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// const getAllUsers = async (req, res) => {
//   try {
//     const Users = await User.find();
//     res.status(200).json(Users);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

const getcustomlimitusers = async (req, res) => {
  let limit = req.params.limit;
  try {
    const Users = await User.find().limit(limit);
    res.status(200).json(Users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSingleUser = async (req, res) => {
  const username = req.params.username;
  try {
    const user = await User.findOne({ username: username }).populate("skills");
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const isvalid = await user.isValidPassword(password);
    const username = user.username;
    if (isvalid) {
      // username edhe pw correct
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || "qelsi",
        {
          expiresIn: "1d",
        }
      );

      res.json({ token, username }); //kthehet tokeni si response
    }
  } else {
    res.status(404).json({ message: "Incorrect username or password" });
  }
};

const createUser = async (req, res) => {
  const {
    username,
    fullname,
    email,
    password,
    role,
    about,
    courses,
    university,
    highschool,
    skills,
  } = req.body;

  const image = req.file ? req.file.filename : "";

  if (!username || !fullname || !email || !password || !role) {
    return res.status(400).json({ message: "Required fields are missing" });
  }

  try {
    // Check for duplicate userID
    const existingUserUsername = await User.findOne({ username });
    const existingUserEmail = await User.findOne({ email });

    if (existingUserUsername) {
      return res
        .status(409)
        .json({ message: "User with this username already exists!" });
    } else if (existingUserEmail) {
      return res
        .status(409)
        .json({ message: "User with this email already exists!" });
    }

    const newUser = await User.create({
      username,
      fullname,
      image: image,
      email,
      password,
      role,
      about,
      courses,
      university,
      highschool,
      skills,
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const {
    username,
    fullname,
    email,
    password,
    role,
    about,
    courses,
    university,
    highschool,
    skills,
  } = req.body;
  const updatedData = {
    username,
    fullname,
    email,
    password,
    role,
    about,
    courses,
    university,
    highschool,
    skills,
  };

  if (req.file) {
    updatedData.image = req.file.filename;
  }

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete({ _id: id });
    res.status(204).json({ message: "User deleted successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  getcustomlimitusers,
  loginUser,
  upload
};
