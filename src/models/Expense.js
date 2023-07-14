import mongoose from 'mongoose'

const expenseSchema = new mongoose.Schema({
  amount: Number,
  date: {
    type: Date,
    default: Date.now,
    required: false,
  },
  category: {
    type: String,
    enum: ['Despensa', 'Transporte', 'Vivienda', 'Gusto', 'Ahorro'],
    required: true,
  },
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

export const Expense = mongoose.model('Expense', expenseSchema)
