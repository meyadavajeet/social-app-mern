const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

/**
 * UserController
 * userRoute
 *
 */
router.get("/", (req, res) => {
    res.send("hey its user route");
})

/**
 * get a user
 */
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, updatedAt, ...others } = user._doc;
        return res.status(200).json({ "data": others });
    } catch (err) {
        return res.status(500).json({ "message": err });
    }
});

/**
 * update user
 */
router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json({ "message": err });
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            return res.status(200).json({ "message": "Account has been updated successfully" });

        } catch (err) {
            return res.status(500).json({ "message": err });
        }

    } else {
        return res.status(403).json({ "message": "You can only update your account" });
    }
});



/**
 * delete user
 */
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            return res.status(200).json({ "message": "Accont has been deleted successfully!!" });
        } catch (err) {
            return res.status(500).json({ "message": err });
        }
    } else {
        return res.status(403).json({ "message": "You can delete only your account!!" });
    }
});


/**
 * follow a user
 */

/**
 * unfollow a user
 */
module.exports = router;