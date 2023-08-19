//dependcies
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const router = require('express').Router();

router.get('/', (req, res) => {
    // render 
    res.render('home', { 
        logged_in: req.session.logged_in 
    });

});
module.exports = router;