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
    const token = jwt.sign({ id: validUser._id }, "mern");
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

export const google = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, "mern");
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({
          success: true,
          message: "logined with google successfully",
          ...rest,
        });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, "mern");
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    res.status(401).json({ success: false, message: e.message });
  }
};
export const signOut = async (req, res) => {
  try {
    console.log("jj");
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    res.status(200).json(...error);
  }
};
