const { Post } = require('../models');

const postData = [
    {
        title: 'Explosions are the GREATEST!',
        content: "Once upon a time, God said, 'Let there be light,' and so there was light. God said, 'Let there be strength,' and so there was the high-performance version of Raythean's Challenger Hellcat.",
        user_id: 1  
    },
    {
       title: 'Updated language',
       content: "Ever since Closure and Mayer installed a human voice patch, Justice Knight's functionality as a smart assistant has gone right up! Being able to use natural language logic really has improved communication so much when helping out my masters.",
       user_id: 2
    }
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;