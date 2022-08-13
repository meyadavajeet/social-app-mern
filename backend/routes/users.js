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

router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            // user you want to follow
            const user = await User.findById(req.params.id);

            //current user information
            const currentUser = await User.findById(req.body.userId);

            if (!user.followers.includes(req.body.userId)) {
                //update follower of whom you want to follow
                await user.updateOne({ $push: { followers: req.body.userId } });

                //update following of current user
                await currentUser.updateOne({ $push: { following: req.params.id } });

                return res.status(200).json({ "message": `User has been followed!!` });

            } else {
                return res.status(403).json({ "message": "you already followed this user!!" });
            }

        } catch (err) {
            return res.status(500).json({ "message": err.message });
        }
    } else {
        return res.status(403).json({ "message": `you can't follow yourself!!` })
    }
});

/**
 * unfollow a user
 */
router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            // user you want to follow
            const user = await User.findById(req.params.id);

            //current user information
            const currentUser = await User.findById(req.body.userId);

            if (user.followers.includes(req.body.userId)) {
                //update follower of whom you want to follow
                await user.updateOne({ $pull: { followers: req.body.userId } });

                //update following of current user
                await currentUser.updateOne({ $pull: { following: req.params.id } });

                return res.status(200).json({ "message": `User has been unfollowed!!` });

            } else {
                return res.status(403).json({ "message": `you don't follow this user` });
            }

        } catch (err) {
            return res.status(500).json({ "message": err.message });
        }
    } else {
        return res.status(403).json({ "message": `You can't unfollow yourself!!` })
    }
})

module.exports = router;