'use strict'

import {Schema, model} from 'mongoose'
const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    publication: {
        type: Schema.Types.ObjectId,
        ref: 'Publication',
        required: true
    }
}, {
    versionKey: false
})

export default model('Comment', commentSchema)