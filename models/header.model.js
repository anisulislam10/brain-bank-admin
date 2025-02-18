import mongoose from "mongoose";

const headerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Header = mongoose.model("Header", headerSchema);
export default Header;
