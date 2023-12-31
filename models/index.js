const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// User and Post---------
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Post.belongsTo(User,{
    foreignKey: 'user_id'
});

// Post and Comment---------
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: "cascade"
});

Comment.belongsTo(Post,{
    foreignKey: 'post_id'
});

// User and Comment---------
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: "cascade"
});

Comment.belongsTo(User,{
    foreignKey: 'user_id'
});

module.exports = { User, Post, Comment };