const router = require('express').Router();
const Post = require('../models/Post');

/**
 * postController
 * userRoute
 * @author ajeet
 * @date 13-08-2022
 */

/**
 * create a post
 */
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savePost = await newPost.save();
        res.status(200).json({ "data": savePost });
    } catch (err) {
        return res.status(500).json({ "message": err.message });
    }
})

/**
 * update a post
 */
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ "message": "Post not found" });
        }
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            return res.status(200).json({ "message": "post updated successfully." });
        } else {
            return res.status(404).json({ "message": "you can update only your post" });
        }
    } catch (err) {
        return res.status(500).json({ "message": err.meessage });
    }
});
/**
 * delete a post
 */
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ "message": "Post not found" });
        }
        if (post.userId === req.body.userId) {
            await Post.findByIdAndDelete(req.params.id);
            return res.status(200).json({ "message": "Post deleted successfully." });
        } else {
            return res.status(404).json({ "message": "You can delete only your post" });
        }
    } catch (err) {
        return res.status(500).json({ "message": err });
    }
});

/**
 * like a post
 */

/**
 * get a post
 */
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ "message": "Post not found" });
        }
        if (post.userId === req.body.userId) {
            const { updatedAt, ...others } = post._doc;
            return res.status(200).json({ "data": others });
        } else {
            return res.status(404).json({ "message": "You can see only your post" });
        }

    } catch (err) {
        return res.status(500).json({ "message": err });
    }
});


/**
 * get timeline post of user
 */

module.exports = router;