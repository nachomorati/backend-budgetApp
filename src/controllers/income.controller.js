import { Income } from '../models/Income.js'

export const createIncome = async (req, res) => {
  const { amount, date, category, description } = req.body
  const { uid } = req
  try {
    const income = new Income({
      amount: amount,
      date: date,
      category: category,
      description: description,
      user: uid,
    })
    const resp = await income.save()
    if (!resp._id || !income) throw Error('Error creating the income')

    return res.status(201).json({ income: resp })
  } catch (error) {
    console.log(error)
    return res.json({ error })
  }
}
export const getAllIncomes = async (req, res) => {
  const { uid } = req
  try {
    const incomes = await Income.find({ user: uid }).lean()
    return res.json({ incomes })
  } catch (error) {
    console.log(error)
    return res.json({ error })
  }
}
export const getOneIncome = async (req, res) => {
  const { uid } = req
  const { incomeId } = req.params
  try {
    const income = await Income.find({ _id: incomeId, user: uid }).lean()
    if (!income) throw 'No such income found for this user.'
    return res.json({ income })
  } catch (error) {
    console.log(error)
    return res.json({ error })
  }
}
export const updateIncome = async (req, res) => {
  const { uid } = req
  const { incomeId } = req.params
  try {
    const income = await Income.find({ _id: incomeId, user: uid }).lean()
    if (!income) throw 'No such income found for this user.'

    // TODO validate input data before updating document in db
    const newIncome = Object.assign(income, { ...req.body })
    let updatedIncome = await Income.findByIdAndUpdate(
      { _id: incomeId },
      { $set: { ...newIncome } },
      { new: true }
    ).exec()
    return res
      .status(201)
      .send({ message: 'Updated successfully', data: { updatedIncome } })

    return res.json({ income })
  } catch (error) {
    console.log(error)
    return res.json({ error })
  }
}
export const deleteIncome = async (req, res) => {
  const { uid } = req
  const { incomeId } = req.params
  console.log(uid, incomeId)
  try {
    const deleted = await Income.findOneAndDelete({
      _id: incomeId,
      user: uid,
    })

    if (!deleted) {
      throw 'Error deleting the record'
    }
    return res
      .status(201)
      .json({ message: 'Removed successfully', data: { deleted } })
  } catch (error) {
    console.log('deleteIncome Error:', error)
    return res.json({ error })
  }
}
