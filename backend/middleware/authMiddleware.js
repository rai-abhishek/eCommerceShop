import jwt from "jsonwebtoken";
import asynchandler from "./ayncHandler.js";
import User from "../models/userModel.js";

//Protect routes
const protect = asynchandler(async (req, res, next) => {
  let token;
  //read the JWT from the cookies
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

//Admin middleware
const admin = (req, res, next) => {
  if (res.user && res.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
