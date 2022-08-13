const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

/**
 * authController
 * authRoute
 *
 */

/**
 * Register New User
 */
router.post("/register", async (req, res) => {
    try {
        //genrate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //create new user
        const newUser = await new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
        });
        //save new user
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(err);
    }
});

/**
 * Login
 */
router.post("/login", async (req, res) => {
    try {
        let user = await User.findOne({
            email: req.body.email,
        });
        !user && res.status(404).json("user not found");
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json("Wrong password!!")

        res.status(200).json(user);
    } catch (err) {
       res.status(500).json(err);
    }
});

module.exports = router;