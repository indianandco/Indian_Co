const { Router } = require('express');
const router = Router();

const { postReviewHandler } = require('../Handlers/post/postReviewHandler');

router.post('/', postReviewHandler)

module.exports = router;