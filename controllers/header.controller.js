import Header from "../models/header.model.js";

// @desc Add a new header
// @route POST /api/header
export const addHeader = async (req, res) => {
  try {
    const { title, subtitle } = req.body;

    if (!title || !subtitle) {
      return res.status(400).json({ message: "Title and subtitle are required" });
    }

    const header = new Header({ title, subtitle });
    await header.save();

    res.status(201).json({ message: "Header added successfully", header });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @route GET /api/header
export const getHeaders = async (req, res) => {
  try {
    const headers = await Header.find();
    res.status(200).json(headers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc Get a single header by ID
// @route GET /api/header/:id
export const getHeaderById = async (req, res) => {
  try {
    const header = await Header.findById(req.params.id);
    if (!header) {
      return res.status(404).json({ message: "Header not found" });
    }
    res.status(200).json(header);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc Update a header by ID
// @route PUT /api/header/:id
export const updateHeader = async (req, res) => {
  try {
    const { title, subtitle } = req.body;

    const header = await Header.findById(req.params.id);
    if (!header) {
      return res.status(404).json({ message: "Header not found" });
    }

    header.title = title || header.title;
    header.subtitle = subtitle || header.subtitle;

    await header.save();
    res.status(200).json({ message: "Header updated successfully", header });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc Delete a header by ID
// @route DELETE /api/header/:id
export const deleteHeader = async (req, res) => {
  try {
    const header = await Header.findById(req.params.id);
    if (!header) {
      return res.status(404).json({ message: "Header not found" });
    }

    await Header.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Header deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
