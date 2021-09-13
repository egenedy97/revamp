const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    owner:{
        type: mongoose.Schema.ObjectId,
		ref: "User",
    },
    noteOwner:{
        type:mongoose.Schema.ObjectId , 
        ref:'Note' , 
    },
    text:{
        type:String , 
        required:true
    }
}
,{
    timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
}
)

const Reply = mongoose.model('Reply' , replySchema);
module.exports = Reply ; 
