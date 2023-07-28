const { Router } = require('express');
const router = Router();

const { postReviewHandler } = require('../Handlers/post/postReviewHandler');
const { getReviewByIdHandler} = require ('../Handlers/get/getReviewByIdHandler')
const { getReviewsByProductIdHandler } = require ('../Handlers/get/getReviewsByProductIdHandler')

router.get('/', getReviewByIdHandler)
router.get('/product/:productId', getReviewsByProductIdHandler)

router.post('/', postReviewHandler)

module.exports = router;