import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create({ ...req.body, userId: req.user.id });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { userId: req.user.id };
    const bookings = await Booking.find(filter);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, userId: req.user.id, status: 'pending' });
    if (!booking) return res.status(403).json({ message: 'Not allowed' });
    Object.assign(booking, req.body);
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id, status: 'pending' },
      { status: 'cancelled' },
      { new: true }
    );
    if (!booking) return res.status(403).json({ message: 'Not allowed' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
