const User = require("../Schema/user");
const { connect } = require('mongoose');
require("dotenv").config();

const signup = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.json({ message: "Missing Required Field" });
  }

  try {
    await connect(process.env.MONGO_URI);

    const checkExist = await User.exists({ email });

    if (checkExist) {
      return res.json({ message: "User already exists" });
    }

    await User.create({
      username,
      email,
      password, 
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error during user sign-up:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ message: "Missing Required Field" });
  }

  try {
    await connect(process.env.MONGO_URI);
    const checkExistUser = await User.findOne({ email });

    if (!checkExistUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password === checkExistUser.password)  
      return res.status(200).json({ message: "Successfully Logged In" });
     else {
      return res.json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.error("Error during user Login", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUserByEmail = async (req, res) => {
  const { email } = req.body;

  try {
    await connect(process.env.MONGO_URI);
    const checkExistBrand = await User.findOne({ email });

    if (!checkExistBrand) {
      return res.status(404).json({ message: "User not Exists" });
    } else {
      return res.json({ checkExistBrand });
    }
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUserByID = async (req, res) => {
  const { _id } = req.query;

  try {
    await connect(process.env.MONGO_URI);
    const checkUserID = await User.findOne({ _id });

    if (!checkUserID) {
      return res.status(404).json({ message: "User not found" });
    } else {
      return res.json({ user: checkUserID });
    }
  } catch (error) {
    console.error("Error fetching User By ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    await connect(process.env.MONGO_URI);
    const users = await User.find();
    return res.json({ users });
  } catch (error) {
    console.error("Error fetching all users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  const { _id } = req.body;

  try {
    await connect(process.env.MONGO_URI);
    await User.deleteOne({ _id });
    const users = await User.find();

    return res.json({
      message: "User Deleted Successfully",
      users,
    });
  } catch (error) {
    console.error("Error Deleting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  const { _id, username, email, profile } = req.body;

  const filter = { _id };
  const update = { username, email, profile };

  try {
    await connect(process.env.MONGO_URI);
    await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    const users = await User.find();

    return res.json({
      message: "User Updated Successfully",
      users,
    });
  } catch (error) {
    console.error("Error Updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  signup,
  login,
  getAllUsers,
  getUserByEmail,
  getUserByID,
  deleteUser,
  updateUser,
};
