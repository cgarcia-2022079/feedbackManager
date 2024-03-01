'use strict'

import {Router} from 'express'
import {addCategory, updateCategory, deleteCategory, getAllCategories} from './category.controller.js'
import {validateJwt} from '../middlewares/validate-jwt.js'
const api = Router()

api.post('/addCategory', [validateJwt], addCategory)
api.put('/updateCategory/:id', [validateJwt], updateCategory)
api.delete('/deleteCategory/:id', [validateJwt], deleteCategory)
api.get('/get', [validateJwt], getAllCategories)
export default api