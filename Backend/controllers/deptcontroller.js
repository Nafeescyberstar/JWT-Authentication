const DeptModel = require('../models/department');

exports.adddept = async (req, res) => {

    const deptinfo = new DeptModel({
        deptname: req.body.deptname,
        status: req.body.status
    });

    try {
        const storedeptinfo = await deptinfo.save();
        res.status(200).json(storedeptinfo)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }  
}

exports.alldept = async(req,res)=>{
    try {
        const data = await DeptModel.find({status:true});
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}