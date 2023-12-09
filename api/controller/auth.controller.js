import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
export const signup = async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  const hashPass = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashPass });
  try {
    await newUser.save();
    console.log("new user is created");
    res.status(201).json("new user is created");
  } catch (e) {
    res.status(500).json(e.message);
  }
};
