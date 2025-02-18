import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true,
    },
    answer:{
        type:String,
        required:true
    },
},{timestamps:true})

const Faq=mongoose.model("FAQs", faqSchema);
export default Faq;