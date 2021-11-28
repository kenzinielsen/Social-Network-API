const router = require('express').Router();
const userRoutes = require('./User-routes');
const thoughtRoutes = require('./Thought-routes');

router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;