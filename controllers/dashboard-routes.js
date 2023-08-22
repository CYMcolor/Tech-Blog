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
        //get user data
        const userData = await User.findByPk(req.session.user_id);
        //serialize the data
        const user = userData.get({plain: true}); 
        const posts = postData.map((post) => post.get({plain: true}));
        // variable so that only the logged in user can do stuff in their dashboard
        let sameUser = true;
        // render the dashboard view
        res.render('dashboard', {
            user,
            posts,
            sameUser,
            logged_user: req.session.user_id,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id',  withAuth, async (req, res) => {
    //if the user clicks on link to own dashboard redirect
    if (req.params.id == req.session.user_id) {
        console.log('test');
        return res.redirect('/dashboard');
    }
    try {
        //get all posts
        const postData = await Post.findAll({
            where:{
                user_id: req.params.id,
            },
            include: [
                {
                  model: User
                },
            ]
        });
        //get user data
        const userData = await User.findByPk(req.params.id);
        //serialize the data 
        const user = userData.get({plain: true}); 
        const posts = postData.map((post) => post.get({plain: true}));
        // render the dashboard view
        res.render('dashboard', {
            user,
            posts,
            logged_user: req.session.user_id,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;