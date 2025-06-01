import mongoose from 'mongoose';
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});
export default mongoose.model('Note', noteSchema);
