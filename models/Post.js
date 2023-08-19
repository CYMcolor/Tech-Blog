//dependcies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

//create post model
class Post extends Model {}

//create post table
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
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
        modelName: 'post'
    }
);
