import User from "../models/user.models.js";
import bcryptjs from "bcryptjs";
export const test = (req, res) => {
  res.json({ status: "ok report" });
};
export const updateUser = async (req, res) => {
  if (req.user.id != req.params.id) {
    res.status(401).json("You can only update your own account");
    return;
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res
      .status(200)
      .json({ success: true, message: "User is updated", ...rest });
  } catch (error) {
    res.status(300).json({ success: false, message: "not updated" });
  }
};

export const deleteUser = async (req, res) => {
  console.log("hello");
  if (req.user.id !== req.params.id) {
    console.log("1");
    res
      .status(400)
      .json({ success: false, message: "you can delete only your account" });
    return;
  }
  try {
    console.log("2");
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json({ success: true, message: "User has been deleted" });
  } catch (error) {
    console.log("3");
    res.status(400).json({ success: false, message: "not deleted" });
  }
};
