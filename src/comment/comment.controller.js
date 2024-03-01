'use strict'
import Comment from './comment.model.js'
import Publication from '../Publications/publication.model.js'

export const addComment = async (req, res) => {
    try {
        let publicationId = req.params.id
        let { comment } = req.body
        let authorId = req.user._id
        let newComment = new Comment({ comment, author: authorId, publication: publicationId })
        await newComment.save()
        await Publication.findOneAndUpdate(
            { _id: publicationId },
            { $push: { comments: newComment._id } }
        )
        return res.status(200).send({ message: 'Comment added successfully', newComment })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error adding comment', error })
    }
}

export const updateComment = async (req, res) => {
    try {
        let commentId = req.params.id
        let { comment } = req.body
        let updateComment = await Comment.findOneAndUpdate(
            { _id: commentId, author: req.user._id },
            { comment: comment },
            { new: true }
        )
        if (!updateComment) return res.status(404).send({ message: 'Comment not found or you are not authorized to update it' })
        return res.status(200).send({ message: 'Comment updated successfully', updateComment})
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error updating comment', error })
    }
}

export const deleteComment = async (req, res) => {
    try {
        let commentId = req.params.id
        let comment = await Comment.findById(commentId)
        if (!comment) return res.status(404).send({ message: 'Comment not found' })
        if (comment.author.toString() !== req.user._id.toString()) return res.status(403).send({ message: 'You are not authorized to delete this comment' })
        await Comment.findByIdAndDelete(commentId)
        await Publication.findOneAndUpdate(
            { _id: comment.publication },
            { $pull: { comments: commentId } }
        )
        return res.status(200).send({ message: 'Comment deleted successfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error deleting comment', error })
    }
}