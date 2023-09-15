const { Router } = require('express');
const router = Router();

const {putTicketHandler} = require ('../Handlers/put/putTicketHandler')

const {deleteTicketHandler } = require ('../Handlers/delete/deleteTicketHandler')

router.put ('/updateStatus', putTicketHandler)
router.delete('/deleteTicket/:id', deleteTicketHandler)

module.exports = router;