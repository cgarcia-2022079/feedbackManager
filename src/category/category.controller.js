'use strict'

import Category from './category.model.js'
import Publication from '../Publications/publication.model.js'

export const addCategory = async (req, res) => {
    try {
        let data = req.body
        console.log(data)
        let newCategory = new Category(data)
        if (!newCategory) return res.status(404).send({ message: 'Data not found, not is saved' })
        await newCategory.save()
        res.status(201).send(newCategory)
    } catch (error) {
        res.status(400).send(error)
    }
}

export const deleteCategory = async (req, res)=> {
    try {
        let idCategory = req.params.id
        let categoryToDelete = await Category.findById(idCategory)
        if (!categoryToDelete) return res.status(404).send({ message: 'Category not found' })
        let defaultCategory = await Category.findOne({ title: 'Otros' })
        if (!defaultCategory) return res.status(404).send({ message: 'Default category "Otros" not found' })
        await Publication.updateMany({
            category: categoryToDelete._id},
            { category: defaultCategory._id },
            { multi: true }
        )
        await categoryToDelete.deleteOne()
        return res.status(200).send({message: 'Category deleted successfully'})
    } catch (error) {
        res.status(400).send(error)
        return res.status(500).send({ message: 'Error while deleting category'})
    }
}

export const updateCategory = async (req, res)=>{
    try {
        let idCategory = req.params.id
        let data = req.body
        let categoryToUpdate = await Category.findById(idCategory)
        if (!categoryToUpdate) return res.status(404).send({ message: 'Category not found' })
        await categoryToUpdate.updateOne(data)
        return res.status(200).send({message: 'Category updated successfully'})
    } catch (error) {
        res.status(400).send(error)
        return res.status(500).send({ message: 'Error while updating category'})
    }
}

export const getAllCategories = async (req, res) => {
    try {
        let categories = await Category.find().populate('title description -_id')
        if (!categories) return res.status(404).send({message: 'Data not found'})
        return res.status(200).send(categories)
    } catch (error) {
        res.status(400).send(error)
    }
}