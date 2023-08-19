//dependcies
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt'); //for password incryption
const sequelize = require('../config/connection');

//create user model
class User extends Model {
    //
    checkPassword(loginPw) {
        //loginPw is data to be compared and this.password is to be compared to
      return bcrypt.compareSync(loginPw, this.password);
    }
}

//create table info
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              //must at least be 8 characters long
              len: [8],
            },
        },
    },
    {
        sequelize,
        //time stamps make a created and updated field
        timestamps: false,
        // prevents the table name from being changed
        freezeTableName: true,
        // formats sepration of word with underscores
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;
