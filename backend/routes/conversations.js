const router = require('express').Router();
const Conversation = require('../models/Conversation');

/**
 * New Conversation
 */
router.post("/", async (req, res) => {
    const conversation = new Conversation({
        members: [
            req.body.senderId,
            req.body.recieverId
        ],
    });

    try {
        const saveConversation = await conversation.save();
        return res.status(200).json(saveConversation);
    } catch (err) {
        res.status(500).json({ "message": err });
    }
});

/**
 * Get Conversation of a user
 */
router.get("/:userId", async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        return res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json({ "message": err });
    }
});


module.exports = router;