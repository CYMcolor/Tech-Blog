const { Comment } = require('../models');

const commentData = [
    {
        content: "BRAVO~ BRAVO~!!!! Justice Knight!!!",
        user_id: 1,
        post_id: 2  
    },
    {
       content: "Beep-Beep, Justice Knight is glad you are performing optimally.",
       user_id: 2,
       post_id: 1
    },
    {
       content: "It is amazing to see a robot communicate just like my sister",
       user_id: 3,
       post_id: 2
    }

]

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;