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
      require: [true, 'Please add a status'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Todos', todoSchema);
