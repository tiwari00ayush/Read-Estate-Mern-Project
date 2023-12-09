import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const signup = async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  const hashPass = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashPass });
  try {
    await newUser.save();
    console.log("new user is created");
    res.status(201).json({ success: true, message: "New user is created" });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      res.status(404).json({ success: false, message: "user not exist" });
      return;
    }

    const validPass = bcryptjs.compareSync(password, validUser.password);
    if (!validPass) {
      res.status(401).json({ success: false, message: "Wrong password" });
      return;
    }
    const token = jwt.sign({ id: validUser._id }, "ihascsjab");
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ success: true, message: "logined", ...rest });
    console.log("login successfully");
  } catch (e) {
    res.status(401).json({ success: false, message: e.message });
  }
};
