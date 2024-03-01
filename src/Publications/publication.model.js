'use strict'

import { Schema } from "mongoose"
import { model } from "mongoose"

const publicationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    mainText:{
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
}, {
    versionKey: false
})

export default model('Publication', publicationSchema)