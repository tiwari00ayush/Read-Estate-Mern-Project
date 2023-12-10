import Listing from "../models/listing.model.js";

export const createListing = async (req, res) => {
  try {
    const listing = await Listing(req.body);
    res.status(201).json("listing created");
  } catch (e) {
    res.status(400).json({ success: false, message: e.message });
  }
};
