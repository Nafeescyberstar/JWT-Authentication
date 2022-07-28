const mongoose = require('mongoose');

const EmpSchema = new mongoose.Schema({
    fname:{
        type:String,
       
    },
    lname:{
        type:String,
        
    },
    age:{
        type:Number,
       
    },
    salary:{
        type:Number,
        required:true
    },
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Department',
        
    }
})

module.exports = mongoose.model('Emp',EmpSchema);