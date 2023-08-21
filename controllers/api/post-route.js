const router = require('express').Router();
const { Post } = require('../../models');

// create post
router.post('/', async (req, res) => {
    try {
        const postData = await Post.create({
            // info recieved
            title: req.body.title,
            content: req.body.content,
            // the user loggedin
            user_id: req.session.user
        });

        res.status(200).json(postData);

    } catch (err) {
        console.log(err);
        //400 is bad request
        res.status(400).json(err);
    }
});

// delete post
router.delete('/', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        if(!postData){
            res.status(404).json({ message:'No post with this id!' });
            return;
        }
        // 200 means it was successful
        res.status(200).json(postData);        
    } catch (err) {
        console.log(err);
        //500 is generic error
        res.status(500).json(err);
    }
});

// update post
router.put('/', async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        if(!postData[0]){
            res.status(404).json({ message:'No post with this id!' });
            return;
        }
        // 200 means it was successful
        res.status(200).json(postData);        
    } catch (err) {
        console.log(err);
        //500 is generic error
        res.status(500).json(err); 
    }
});

module.exports = router;