import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
    scope: ['user:email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails && profile.emails[0]?.value;
      let user = await User.findOne({ githubId: profile.id });
      if (!user) {
        user = await User.create({
          githubId: profile.id,
          username: profile.username,
          email
        });
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));
