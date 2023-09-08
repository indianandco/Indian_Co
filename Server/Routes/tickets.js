const { Router } = require('express');
const router = Router();

const { postTicketsHandler } = require('../Handlers/post/postTicketsHandler');

const {putTicketHandler} = require ('../Handlers/put/putTicketHandler')

const {deleteTicketHandler } = require ('../Handlers/delete/deleteTicketHandler')

router.post('/', postTicketsHandler);
router.put ('/updateStatus', putTicketHandler)
router.delete('/deleteTicket/:id', deleteTicketHandler)

module.exports = router;