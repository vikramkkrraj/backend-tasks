import User from "../models/User.js";

export const subscribe = async (req, res) => {
    const { plan } = req.body;
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 30);
    await User.findByIdAndUpdate(req.user.id, { subscription: { plan, expiresAt: expiry } });
    res.json({ message: "Subscribed" });
};

export const checkStatus = async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user.subscription || user.subscription.expiresAt < new Date()) {
        await User.findByIdAndUpdate(req.user.id, { subscription: { plan: "free", expiresAt: null } });
        return res.json({ plan: "free", expired: true });
    }
    res.json(user.subscription);
};

export const renew = async (req, res) => {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 30);
    await User.findByIdAndUpdate(req.user.id, { "subscription.expiresAt": expiry });
    res.json({ message: "Renewed" });
};

export const cancel = async (req, res) => {
    await User.findByIdAndUpdate(req.user.id, { subscription: { plan: "free", expiresAt: null } });
    res.json({ message: "Cancelled" });
};