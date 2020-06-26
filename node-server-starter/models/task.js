import mongoose from 'mongoose';

const { Schema } = mongoose;

const Task = new Schema({
  name: String,
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  type: { type: String, enum: ['active', 'completed'] },
  created: { type: Date, default: Date.now },
});

export default mongoose.model('Task', Task);
