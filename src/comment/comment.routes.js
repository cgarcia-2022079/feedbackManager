'use strict'

import {Router} from 'express'
import {addComment, updateComment, deleteComment} from './comment.controller.js'
import {validateJwt} from '../middlewares/validate-jwt.js'
const api = Router()

api.post('/addComment/:id', [validateJwt], addComment)
api.put('/updateComment/:id', [validateJwt], updateComment)
api.delete('/deleteComment/:id', [validateJwt], deleteComment)

export default api