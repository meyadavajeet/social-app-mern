const router = require('express').Router();

/**
 * UserController
 * userRoute
 *
 */
router.get("/", (req, res) => {
    res.send("hey its user route");
})

module.exports = router;