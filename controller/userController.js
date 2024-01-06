const role = require("../enum/role");
// const user = require("../models/user")
const { User } = require("../models");

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      role, // Set the default role or adjust based on your logic
    });

    






    res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
const addtocart = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      role, // Set the default role or adjust based on your logic
    });

    res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      role, // Set the default role or adjust based on your logic
    });

    res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
const getCart = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      role, // Set the default role or adjust based on your logic
    });

    res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = { signup, addtocart, login, getCart };
