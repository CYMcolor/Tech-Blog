const sequelize = require('../config/connection');
const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');

const seedAll = async () => {
    await sequelize.sync({ force: true });
  
    await seedUsers();

    await seedPosts();
  
    process.exit(0);
  };
  
seedAll();