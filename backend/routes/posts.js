const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

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
 * like & dislike a post
 */
router.put("/:id/like-dislike", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ "message": "Post not found" });
        }
        //like post
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            return res.status(200).json({ "message": "The post has been liked" });
        } else {
            //dislike post
            await post.updateOne({ $pull: { likes: req.body.userId } });
            return res.status(200).json({ "message": "The post has been disliked" });
        }
    } catch (err) {
        return res.status(500).json({ "message": err });
    }

})

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
 * get timeline post of user along with post of the user you follow
 */
router.post("/timeline/all", async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId);
        const userPost = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
            currentUser.following.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res.json(userPost.concat(...friendPosts));
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

module.exports = router;