const express = require('express') ; 
const auth = require('../middleware/auth')
const router = new express.Router()
const {createTicket , ChangeStatus , reserveTicket , getAllTickets , addnote ,getAllNotes , createReply , getAllReplies}= require('../controller/ticketController') ;

router.post('/createTicket'  , createTicket) ;
router.post('/reserve/:tid' , auth , reserveTicket) ; 
router.post('/changeStatus/:id/:status' , auth , ChangeStatus) ; 
router.get('/getAllTickets'  ,getAllTickets);

router.post('/ticket/:id/addnote' ,auth , addnote) ;
router.get('/ticket/:id/getAllNotes' , getAllNotes) ; 

router.post('/ticket/:id/createReply/:noteId' , createReply) ;
router.get('/ticket/:id/:noteId/getReplies' , getAllReplies) ; 

module.exports = router ; 