const { Router } = require('express');
const router = Router();

const { postTicketsHandler } = require('../Handlers/post/postTicketsHandler');

const {putTicketHandler} = require ('../Handlers/put/putTicketHandler')

router.post('/', postTicketsHandler);
router.put ('/updateStatus', putTicketHandler)

module.exports = router;