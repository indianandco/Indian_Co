const { Router } = require('express');
const router = Router();

const { postReviewHandler } = require('../Handlers/post/postReviewHandler');
const { getReviewByIdHandler} = require ('../Handlers/get/getReviewByIdHandler');
const { getReviewsByProductIdHandler } = require ('../Handlers/get/getReviewsByProductIdHandler');
const { deleteReviewByIdHandler } = require('../Handlers/delete/deleteReviewByIdHandler');

router.get('/', getReviewByIdHandler);
router.post('/', postReviewHandler);
router.get('/product/:pid', getReviewsByProductIdHandler);
router.delete('/delete/:id', deleteReviewByIdHandler);

module.exports = router;