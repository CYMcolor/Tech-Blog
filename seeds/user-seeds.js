const { User } = require('../models');

const userData = [
    {
        username: 'THRM-EX',
        password: 'EnergyShock'
    },
    {
        username: 'Justice_Knight',
        password: 'beepbeep'
    }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;