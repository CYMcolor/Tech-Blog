//dependcies
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
const router = require('express').Router();

router.get('/', withAuth, async (req, res) => {
    try {
        //get all posts
        const postData = await Post.findAll({
            where:{
                user_id: req.session.user_id
            },
            include: [
                {
                  model: User
                },
            ]
        });
        //serialize the data 
        const posts = postData.map((post) => post.get({plain: true}));
        // render the homp view
        res.render('dashboard', {
            posts, 
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;