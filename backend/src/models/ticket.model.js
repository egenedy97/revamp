const mongoose = require('mongoose') ; 

const ticketSchema = new mongoose.Schema({
    title:{
        type:String , 
        required:true , 
        unique:true
    },
    status:{
        type:String , 
        enum: ['Active', 'Pending', 'Closed'],
        default: 'Active'
    },
    lastedUpdate:{
        type:Date
    },
    owner:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
    }

},{
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
});

const Ticket = mongoose.model("Ticket" , ticketSchema) ; 

module.exports = Ticket ; 
