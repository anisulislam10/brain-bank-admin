import Faq from "../models/faq.model.js";

// @desc Add a new FAQ
// @route POST /api/faqs
export const addFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;

    // Validate inputs
    if (!question || !answer) {
      return res.status(400).json({ message: "Question and answer are required" });
    }

    // Check if the question already exists
    const existingFaq = await Faq.findOne({ question });
    if (existingFaq) {
      return res.status(400).json({ message: "This question already exists" });
    }

    // Save the new FAQ
    const faq = new Faq({ question, answer });
    await faq.save();

    res.status(201).json({ message: "FAQ added successfully", faq });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc Get all FAQs
// @route GET /api/faqs
export const getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc Get a single FAQ by ID
// @route GET /api/faqs/:id
export const getFaqById = async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }
    res.status(200).json(faq);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc Update an FAQ by ID
// @route PUT /api/faqs/:id
export const updateFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const faq = await Faq.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    // Check if the updated question already exists (excluding the current FAQ)
    if (question) {
      const existingFaq = await Faq.findOne({ question, _id: { $ne: req.params.id } });
      if (existingFaq) {
        return res.status(400).json({ message: "This question already exists" });
      }
    }

    faq.question = question || faq.question;
    faq.answer = answer || faq.answer;

    await faq.save();
    res.status(200).json({ message: "FAQ updated successfully", faq });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc Delete an FAQ by ID
// @route DELETE /api/faqs/:id
export const deleteFaq = async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    await Faq.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc Get total number of FAQs
// @route GET /api/faqs/count
export const getFaqCount = async (req, res) => {
    try {
      const count = await Faq.countDocuments();
      res.status(200).json({ totalFaqs: count });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };