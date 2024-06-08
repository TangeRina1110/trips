const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const CommentSchema = new Schema({
    text:{type: String, required: true},
    post:{type: Schema.Types.ObjectId, ref:'Post', required: true},
    author:{type: Schema.Types.ObjectId, ref:'User'},
}, {
    timestamps: true,
});

const Comment = model('Comment', CommentSchema);

module.exports = Comment;