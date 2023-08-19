const router = require('express').Router();
const { User } = require('../../models');

// create user data for sign up
router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.userId = userData.id;
        // if signed up session is logged in
        req.session.loggedIn = true;
  
        res.status(200).json(userData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
});

// cheacks user login information
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });
        //check username
        if(!userData){
            res.status(400).json({
                message: 'Incorrect username or password, please try again' 
            });
            return;
        }
        //check password
        const validPassword = await userData.checkPassword(req.body.password);
        if(!validPassword){
            res.status(400).json({
                message: 'Incorrect username or password, please try again' 
            });
            return;
        }
        //save session
        req.session.save(() =>{
            req.session.userId = userData.id;
            req.session.loggedIn = true;
            res.json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// logout
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            // 204 means that the req sucess but there is not content
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;