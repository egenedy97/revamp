const mongoose = require('mongoose');
const noteSchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.ObjectId,
		ref: "User",
    },
    ticketOwner:{
        type:mongoose.Schema.ObjectId , 
        ref:'Note' , 
    },
    text:{
        type:String , 
        required:true
    }, 
   
}
,{
    timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
}
)

const Note = mongoose.model('Note' , noteSchema);
module.exports = Note ; 

