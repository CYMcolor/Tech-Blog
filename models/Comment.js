//dependcies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const Post = require('./Post');

//create post model
class Comment extends Model {}

//create post table
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: id
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: id
            }
        }
        
    },
    {
        sequelize,
        //time stamps make a created and updated field
        timestamps: true,
        // prevents the table name from being changed
        freezeTableName: true,
        // formats sepration of word with underscores
        underscored: true,
        modelName: 'comment'
    }
);
