import mongoose from "mongoose";
const whyBrainBankSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const WhyBrainBank = mongoose.model("WhyBrainBank", whyBrainBankSchema);

export default WhyBrainBank