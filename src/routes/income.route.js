import { Router } from 'express'
import {
  createIncome,
  deleteIncome,
  getAllIncomes,
  getOneIncome,
  updateIncome,
} from '../controllers/income.controller.js'
import { tokenHeaderValidator } from '../middlewares/validatorManager.js'
import { requireToken } from '../middlewares/requireToken.js'

const router = Router()

// C
router.post('/', tokenHeaderValidator, requireToken, createIncome)
// R
router.get('/', tokenHeaderValidator, requireToken, getAllIncomes)
router.get('/:incomeId', tokenHeaderValidator, requireToken, getOneIncome)
// U
router.patch('/:incomeId', tokenHeaderValidator, requireToken, updateIncome)
// D
router.delete('/:incomeId', tokenHeaderValidator, requireToken, deleteIncome)

export default router
