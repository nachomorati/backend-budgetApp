import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

import { errorTokens } from '../helpers/errorsToken.js'
import { generateRefreshToken, generateToken } from '../utils/tokenManager.js'

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body
    let user = await User.findOne({ email })
    if (user) throw new Error('Email ya registrado 😒')

    user = new User({ email, password, name })

    await user.save()

    //Generar token
    const { token, expiresIn } = generateToken(user.id)
    generateRefreshToken(user.id, res)

    return res.json({ token, expiresIn })
  } catch (error) {
    console.log(error)
    return res.status(403).json({ error: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    let user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Email o Contraseña incorrectas.')
    }

    const { token, expiresIn } = generateToken(user.id)
    generateRefreshToken(user.id, res)

    return res.json({ token, expiresIn })
  } catch (error) {
    console.log(error)
    return res.status(403).json({ error: error.message })
  }
}

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid).lean()
    delete user.password
    return res.json({ user })
  } catch (error) {
    console.log(error)
    return res.status(403).json({ error })
  }
}

export const logout = (req, res) => {
  res.clearCookie('refreshToken')
  return res.json({ ok: true })
}

export const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid)
    return res.json({ token, expiresIn })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'error de server' })
  }
}
