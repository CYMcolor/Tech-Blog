//dependcies
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const router = require('express').Router();

router.get('/', async (req, res) => {
    try {
        //get all posts
        const postData = await Post.findAll({
            include: [
                {
                  model: User,
                  attributes: ['username'],
                },
            ]
        });
        //serialize the data 
        const posts = postData.map((post) => post.get({plain: true}));
        // render the homp view
        res.render('home', {
            posts, 
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        //get a singular post
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                  model: User,
                  attributes: ['username'],
                },
                // {
                //   model: Comment,
                //   attributes: ['username', 'content', 'create_at'],  
                // }
            ]
        });
        const post = postData.get({plain: true});
        // render the homp view
        res.render('single-post', {
            post, 
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    //if logged in redirect to home (temporary)
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

module.exports = router;