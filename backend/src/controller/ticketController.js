const Ticket = require('../models/ticket.model') ; 
const Note = require('../models/note.model') ; 
const Reply = require('../models/note.model') ; 

const createTicket = async (req,res)=>{
    try {
        if(req.user.role === 'user')
        {
            throw new Error('you can\'t add this ticket')

        }
        const ticket = new Ticket(req.body) ; 
        const findTicket = await Ticket.findOne({title: ticket.title}) ; 
        if(findTicket)
        {
            throw new Error('Can\'t add this ticket');
        }
        const newTicket = await ticket.save() ; 
        res.status(200).send(newTicket) ;
    }catch(e)
    {
        res.status(400).send(e) ; 
        console.log(e)
    }
}

const reserveTicket = async(req,res)=>{
    try{
        if(req.user.role !== 'user')
        {
            throw new Error('Can not resever this ticket')
        }
        const tick = await Ticket.findById({_id:req.params.tid}); 
        if(!tick)
        {
            throw new Error('Can\'t find this ticket')
        } 
        tick.owner = req.user.id ; 
        const tic = await tick.save();
        res.status(200).send(tic)
    }catch(e)
    {
        res.status(400).send(e) ; 
    }
}

const ChangeStatus = async(req ,res)=>{
    try{
        if(req.user.role === 'user')
        {
            throw new Error('You can\'t change the status of ticket')
        }
        const ticketID = req.params.id ; 
        const ticket = await Ticket.findById({id: ticketID}) ; 
        if(!ticket)
        {
            throw new Error('Can\'t find this ticket' )
        }
        const state = req.params.state ; 
        ticket.status =state ; 
        await ticket.save() ;
        res.status(200).send(ticket) ; 

    }catch(e)
    {
        res.status(400).send(e) ; 
    }
}

const getAllTickets = async(req ,res)=>{
    try{
     const tickets = await Ticket.find({}) ; 
     res.status(200).send(tickets)
    }catch(e)
    {
        res.status(400).send(e)
    }
}

const addnote = async(req,res)=>{
    try{
        const ticket = await Ticket.findById({_id:req.params.id}) ;
    if(!ticket)
    {
        throw new Error('ticketNotFounded') ;
    }
        const note = new Note(req.body) ; 
        // note.owner =req.user.id ; 
        note.ticketOwner = ticket.id ;      
        const addnote = await note.save(); 
        res.status(200).send(addnote) ; 
    } catch(e)
    {
        res.status(400).send() ; 
        console.log(e)
    }  
}
const getAllNotes = async(req,res)=>
{
   try{
    const ticket = await Ticket.findById({_id:req.params.id}) ;
    if(!ticket)
    {
        throw new Error('ticketNotFounded') ;
    }
    const notes = await Note.find({ticketOwner: req.params.id});
    res.status(200).send({notes});
   }catch(e)
   {
       res.status(400).send(e)
   }
}

const getAllReplies= async(req , res)=>
{
    try{
        const ticketId = req.params.id ; 
        const noteId = req.params.noteId ; 
        const ticket = await Ticket.findById({_id:ticketId}) ;
        if(!ticket)
        {
            throw new Error('ticketNotFounded') ;
        }
        const note = await Note.findById({_id : noteId}) ; 
        if(!note)
        {
            throw new Error('note is not founded')
        }
        const replies = await Reply.find({noteOwner : note.id}) ; 
        if(!replies)
        {
            throw new Error('can\'t find replies')
        }
        res.status(200).send(replies);
    }catch(e)
    {
        res.status(400).send(e) ; 
    }
}

const createReply = async(req,res)=>{
    try{
        const ticketId = req.params.id ; 
        const noteId = req.params.noteId ; 
        const ticket = await Ticket.findById({_id:ticketId}) ;
        if(!ticket)
        {
            throw new Error('ticketNotFounded') ;
        }
        const note = await Note.findById({_id : noteId}) ; 
        if(!note)
        {
            throw new Error('note is not founded')
        }
        const reply = new Reply(req.body) ; 
        reply.owner = req.user.id ; 
        reply.noteOwner = note._id ; 
        const newReply = await reply.save() ; 
        res.status(200).send(newReply) ; 

    }catch(e)
    {
        res.status(400).send(e);
        console.log(e) ;
    }
}


module.exports= {createTicket , ChangeStatus , reserveTicket ,getAllTickets ,addnote , getAllNotes  , getAllReplies , createReply} ; 

