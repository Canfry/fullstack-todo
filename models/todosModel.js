import mongoose from 'mongoose';

const todoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'User',
    },
    description: {
      type: String,
      require: [true, 'Please add a description'],
    },
    status: {
      type: String,
      enum: ['New', 'In progress', 'Completed'],
      default: 'New',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Todos', todoSchema);
