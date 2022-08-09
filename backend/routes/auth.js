const router = require('express').Router();
const UserModel = require('../models/User');

/**
 * authController
 * authRoute
 *
 */

/**
 * Register New User
 */
router.get("/register", async (req, res) => {
    const user = await new UserModel({
        username: "Ajeet3",
        email: "ajeet3@gmail.com",
        password: "123456"
    });
    await user.save();
    res.send("OK");
})

module.exports = router;