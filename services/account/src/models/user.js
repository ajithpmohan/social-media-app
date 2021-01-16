import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      max_length: 32,
      required: true,
    },
    password: { type: String, required: true },
    isActive: { type: Boolean, required: true },
  },
  { timestamps: true },
);

userSchema.static('findByEmail', function (email) {
  return this.find({ email });
});

const User = mongoose.model('User', userSchema, 'users');

export default User;
