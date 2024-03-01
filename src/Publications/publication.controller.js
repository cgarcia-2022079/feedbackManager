'use strict'

import Publication from './publication.model.js'
import Comment from '../comment/comment.model.js'

export const addPublication = async (req, res) => {
    try {
        let { title, category, mainText } = req.body
        let authorId = req.user._id
        
        let publication = new Publication({
            title,
            category,
            mainText,
            author: authorId
        })
        await publication.save()
        await publication.populate('author', 'username')
        return res.status(200).send({ message: 'Publication added successfully', publication })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error adding publication', error })
    }
}

export const updatePublication = async (req, res) => {
    try {
        let idPublication = req.params.id
        let { title, category, mainText } = req.body
        let comparation = { _id: idPublication, author: req.user._id }
        let updatePublication = { title, category, mainText }
        let publication = await Publication.findOneAndUpdate(comparation, updatePublication, { new: true })
        if (!publication) return res.status(404).send({ message: 'Publication not found or you are not authorized to update this publication' })
        return res.status(200).send({ message: 'Publication updated successfully', publication })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error updating publication', error })
    }
}

export const deletePublication = async (req, res) => {
    try {
        let idPublication = req.params.id
        let userId = req.user._id
        let publication = await Publication.findOneAndDelete({ _id: idPublication, author: userId })
        if (!publication) return res.status(404).send({ message: 'Publication not found or you are not authorized to delete this publication' })
        await Comment.deleteMany({ publication: idPublication })
        return res.status(200).send({ message: 'Publication and related comments deleted successfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error deleting publication', error })
    }
}

export const getUserPublications = async (req, res) => {
    try {
        let userId = req.user._id
        let publications = await Publication.find({ author: userId })
            .select('title author category mainText -_id')
            .populate({
                path: 'author',
                select: 'username -_id'
            }).populate({
                path: 'category',
                select: 'title -_id'
            }).populate({
                path: 'comments',
                select: 'comment author -_id',
                populate: {
                path: 'author',
                select: 'username -_id'
                }
            })
        if (!publications) return res.status(404).send({ message: 'Publications not found' })
        return res.status(200).send({ publications })
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error fetching user publications', error });
    }
};