const router = require('express').Router();
const Message = require('../models/Message');

/**
 * create mew message
 */
router.post("/", async (req, res) => {
    const message = await Message(req.body);

    try {
        const saveMessage = await message.save();
        res.status(200).json(saveMessage)
    } catch (error) {
        res.status(500).json({ "message": error })
    }
});

/**
 * get all messages by conversation id
 */
router.get('/:conversationId', async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        });
        return res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ "message": error })
    }
});


module.exports = router;