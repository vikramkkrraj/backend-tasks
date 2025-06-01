import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    title: String,
    body: String,
    type: { type: String, enum: ["free", "premium"], default: "free" }
});

export default mongoose.model("Content", contentSchema);