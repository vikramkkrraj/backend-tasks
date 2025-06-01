import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    plan: { type: String, default: "free" },
    expiresAt: Date
});

const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, default: "user" },
    subscription: subscriptionSchema
});

export default mongoose.model("User", userSchema);