import express from 'express';
import {
  createBooking, getBookings, updateBooking,
  cancelBooking, approveBooking, rejectBooking, deleteBooking
} from '../controllers/bookingController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = express.Router();
router.use(authMiddleware);
router.post('/', createBooking);
router.get('/', getBookings);
router.put('/:id', updateBooking);
router.delete('/:id', cancelBooking);
router.patch('/:id/approve', requireRole('admin'), approveBooking);
router.patch('/:id/reject', requireRole('admin'), rejectBooking);
router.delete('/:id', requireRole('admin'), deleteBooking);
export default router;
