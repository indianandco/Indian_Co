const {deleteTicketController } = require ('../../Controllers/delete/deleteTicketController')

const deleteTicketHandler=async (req, res)=>{
    const id = req.params.pid
try {
    const response = await deleteTicketController(id)
    return res.status(200).json({ result: 'success', payload:response})
} catch (error) {
    return res.status(400).json(error)

}
}

module.exports={
    deleteTicketHandler
}