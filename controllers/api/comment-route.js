const router = require('express').Router();
const { Comment } = require('../../models');

// create comment
router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            // info recieved
            content: req.body.content,
            post_id: req.body.post_id,
            // the user loggedin
            user_id: req.session.user
        });

        res.status(200).json(commentData);

    } catch (err) {
        console.log(err);
        //400 is bad request
        res.status(400).json(err);
    }
});

// delete comment
router.delete('/', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        if(!commentData){
            res.status(404).json({ message:'No comment with this id!' });
            return;
        }
        // 200 means it was successful
        res.status(200).json(commentData);        
    } catch (err) {
        console.log(err);
        //500 is generic error
        res.status(500).json(err);
    }
});

// comment update
router.put('/', async (req, res) => {
    try {
        const commentData = await Comment.update({
            where: {
                id: req.params.id
            }
        });
        if(!commentData[0]){
            res.status(404).json({ message:'No comment with this id!' });
            return;
        }
        // 200 means it was successful
        res.status(200).json(commentData);        
    } catch (err) {
        console.log(err);
        //500 is generic error
        res.status(500).json(err); 
    }
});

module.exports = router;