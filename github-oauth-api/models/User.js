import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  githubId: { type: String, unique: true },
  username: String,
  email: String
});
export default mongoose.model('User', userSchema);
