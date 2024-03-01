'use strict'

import {Router} from 'express'
import { addPublication, updatePublication, deletePublication, getUserPublications } from './publication.controller.js'
import {validateJwt} from '../middlewares/validate-jwt.js'
const api = Router()

api.post('/newPublication', [validateJwt], addPublication)
api.put('/updatePublication/:id', [validateJwt], updatePublication)
api.delete('/deletePublication/:id', [validateJwt], deletePublication)
api.get('/mypublications', [validateJwt], getUserPublications)
export default api