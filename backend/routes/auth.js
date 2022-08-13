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
        //get data from request body
        const email = req.body.email;
        const username = req.body.username;

        // check user already registered or not
        const checkUser = await User.find({ email: email });
        if (checkUser.length > 0) {
            return res.status(409).json({ 'message': `User with ${email} already Exist!!` });
        }
        const checkUserName = await User.find({ username: username });
        if (checkUserName.length > 0) {
            return res.status(409).json({ 'message': `User with ${username} already Exist!!` });
        }

        //genrate hashed password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = await new User({
            username: username,
            password: hashedPassword,
            email: email,
        });
        //save new user
        const user = await newUser.save();
        return res.status(200).json({ 'data': user });
    } catch (error) {
        return res.status(500).json({ "message": err.message });
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
        !user && res.status(404).json({ "message": "user not found" });
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json({ "message": "Wrong password!!" })

        return res.status(200).json({ 'data': user });
    } catch (err) {
        return res.status(500).json({ 'message': err.message });
    }
});

module.exports = router;