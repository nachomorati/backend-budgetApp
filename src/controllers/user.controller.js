import { User } from '../models/User.js'

export const getAll = async (req, res) => {
  try {
    const users = await User.find()
    return res.json({ users })
  } catch (error) {
    console.log(error)
    return res.status(401).json({ error: error.message })
  }
}
