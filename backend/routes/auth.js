const router = require('express').Router();
const User = require('../models/User');

/**
 * authController
 * authRoute
 *
 */

/**
 * Register New User
 */
router.post("/register", async (req, res) => {
    const newUser = await new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    });
    try {
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;