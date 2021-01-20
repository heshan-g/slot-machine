const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  email: String,
  password: String,
  dateOfBirth: Date,
  prizePoints: Number,
  attempts: Number,
  vouchers: [
    {
      voucherID: String,
      value: Number,
    },
  ],
  isActive: Boolean,
  // createdAt: { type: Date, default: Date.now },
});

module.exports = model('user', userSchema);
