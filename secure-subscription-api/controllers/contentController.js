import Content from "../models/Content.js";

export const getFreeContent = async (req, res) => {
    const content = await Content.find({ type: "free" });
    res.json(content);
};

export const getPremiumContent = async (req, res) => {
    const content = await Content.find({ type: "premium" });
    res.json(content);
};

export const createContent = async (req, res) => {
    const content = new Content(req.body);
    await content.save();
    res.status(201).json(content);
};

export const deleteContent = async (req, res) => {
    await Content.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
};