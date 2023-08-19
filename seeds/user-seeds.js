const { User } = require('../models');

const userData = [
    {
        id: 1,
        username: 'THRM-EX',
        password: 'EnergyShock'
    },
    {
        id: 2,
        username: 'Justice_Knight',
        password: 'beepbeep'
    },
    {
        id: 3,
        username: 'Eunectes',
        password: 'iluvLancet'
    }
]

const seedUsers = () => User.bulkCreate(userData, {
    //bulk create does not do indvidual hooks on default
    individualHooks: true,
    returning: true,
});

module.exports = seedUsers;