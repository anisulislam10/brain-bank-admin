import WhyBrainBank from "../models/whyus.model.js";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images in the uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// @desc Get all records
export const getAll = async (req, res) => {
  try {
    const data = await WhyBrainBank.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get record by ID
export const getById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const data = await WhyBrainBank.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Not Found" });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Create new record with image upload
export const create = async (req, res) => {
  try {
    const { title, subtitle } = req.body;

    // Check if an image is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Check for duplicate title
    const existingEntry = await WhyBrainBank.findOne({ title });
    if (existingEntry) {
      return res.status(400).json({ message: "Title already exists" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const newEntry = new WhyBrainBank({ title, subtitle, imageUrl });
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Update record with image upload
export const update = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const updatedData = { ...req.body };

    // If an image is uploaded, update the image URL
    if (req.file) {
      updatedData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedRecord = await WhyBrainBank.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedRecord) return res.status(404).json({ message: "Not Found" });
    res.json(updatedRecord);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Delete record with validation
export const deleteEntry = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const deletedData = await WhyBrainBank.findByIdAndDelete(req.params.id);
    if (!deletedData) return res.status(404).json({ message: "Not Found" });

    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Export multer upload for use in routes
export { upload };
