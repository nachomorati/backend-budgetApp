import mongoose from 'mongoose'
import { Expense } from '../models/Expense.js'
import { User } from '../models/User.js'

export const createExpense = async (req, res) => {
  const { amount, category, user, description, date } = req.body
  const { uid } = req
  try {
    const expense = new Expense({
      amount,
      category,
      user: uid,
      description,
      date,
    })

    await expense.save()

    return res.json({ expense })
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: error.message })
  }
}

export const readExpenses = async (req, res) => {
  const { uid } = req
  try {
    const expenses = await Expense.find({ user: req.uid }).lean()
    return res.json({ expenses })
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: error.message })
  }
}

export const readExpense = async (req, res) => {
  const { uid } = req
  const { id } = req.params
  try {
    const user = await User.findById(uid)
    const userId = user._id
    const expense = await Expense.findById(id)
    if (!expense)
      return res.status(404).json({ error: "This expense doesn't exist" })

    if (!expense.user.equals(uid))
      return res
        .status(401)
        .json({ error: 'You are no authorized to do that 🤡' })

    return res.json({ expense })
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: error.message })
  }
}

export const updateExpense = async (req, res) => {
  const { uid } = req
  const { expenseId } = req.params
  const { body } = req
  try {
    const resp = await Expense.findOneAndUpdate(
      { user: uid, _id: expenseId },
      { $set: body },
      { new: true }
    )
    if (!resp) throw new Error('Expense not updated. Check your data.')
    return res.status(200).json({ resp })
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: error.message })
  }
}

export const deleteExpense = async (req, res) => {
  const { uid } = req
  const { expenseId } = req.params
  try {
    const resp = await Expense.findOneAndDelete({ _id: expenseId, user: uid })
    if (!resp) throw new Error('The Expense was not deleted. Check your data')
    return res.json({ expense: resp })
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: error.message })
  }
}
