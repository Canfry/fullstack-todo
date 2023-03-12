import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'Please add a name'],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      require: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      require: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
