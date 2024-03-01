import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { config } from 'dotenv'
import userRoutes from '../src/user/user.routes.js'
import publicationRoutes from '../src/Publications/publication.routes.js'
import commentRoutes from '../src/comment/comment.routes.js'
import Category from '../src/category/category.model.js'
import categoryRoutes from '../src/category/category.routes.js'

const server = express()
config()
const port = process.env.PORT || 3200

let createDefaultCategory = async () => {
    try {
        let existingDefaultCategory = await Category.findOne({ title: 'Otros' })

        if (!existingDefaultCategory) {
            let defaultCategory = new Category({
                title: 'Otros',
                description: 'Categoría por defecto para productos sin categoría asignada'
            })

            await defaultCategory.save()
            console.log('Default category created')
        }
    } catch (error) {
        console.error('Error creating default category:', error)
    }
}

// Configurar el servidor de express
server.use(express.urlencoded({ extended: false }))
server.use(express.json())
server.use(cors())
server.use(helmet())
server.use(morgan('dev'))

// Declaracion de rutas
server.use(userRoutes)
server.use('/publication', publicationRoutes)
server.use('/comment', commentRoutes)
server.use('/category', categoryRoutes)

// Levantar el servidor
export const initServer = async () => {
    await createDefaultCategory()
    server.listen(port, () => {
        console.log(`Server HTTP running in port ${port}`)
    })
}