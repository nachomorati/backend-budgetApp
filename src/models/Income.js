import mongoose from 'mongoose'

const incomeSchema = new mongoose.Schema({
  amount: Number,
  date: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    enum: ['Sueldo', 'Extra'],
  },
  description: String,
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
})

export const Income = mongoose.model('Income', incomeSchema)
