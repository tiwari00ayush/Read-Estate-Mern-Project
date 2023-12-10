import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token);
  if (!token) {
    res.status(401).json({ message: "Unauth access" });
    return;
  }

  jwt.verify(token, "mern", (err, user) => {
    if (err) {
      res.status(403).json({ message: "forbdden" });
      return;
    }
    req.user = user;
    next();
  });
};
