import express from "express";
import { verifyToken } from "../utils/validUser.js";
import { createListing } from "../controller/listing.controller.js";
const router = express.Router();
router.post("/create", verifyToken, createListing);
