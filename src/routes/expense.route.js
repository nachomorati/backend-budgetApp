import { Router } from 'express'
import {
  createExpense,
  deleteExpense,
  readExpense,
  readExpenses,
  updateExpense,
} from '../controllers/expense.controller.js'
import { tokenHeaderValidator } from '../middlewares/validatorManager.js'
import { requireToken } from '../middlewares/requireToken.js'

const router = Router()

//C
router.post('/', tokenHeaderValidator, requireToken, createExpense)
//R
router.get('/', tokenHeaderValidator, requireToken, readExpenses)
router.get('/:id', tokenHeaderValidator, requireToken, readExpense)
//U
router.patch('/:expenseId', tokenHeaderValidator, requireToken, updateExpense)
//D
router.delete('/:expenseId', tokenHeaderValidator, requireToken, deleteExpense)

export default router
