const mongoose = require('mongoose');
const DepartmentSchema = new mongoose.Schema({
    deptname:{
        type:String,
    },
   status:{ 
    type: Boolean 
    }
   
})

module.exports = mongoose.model('Department',DepartmentSchema);