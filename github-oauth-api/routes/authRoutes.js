import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.get('/github', passport.authenticate('github', { session: false }));

router.get('/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  }
);

export default router;
