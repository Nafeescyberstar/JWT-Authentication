
const dept = require('../models/department');
const EmpModel = require('../models/emp');



exports.adduser = async (req, res) => {
   
    const data = new EmpModel({
        fname: req.body.fname,
        lname: req.body.lname,
        age: req.body.age,
        salary: req.body.salary,
        department: req.body.department

    });

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.index = async (req, res) => {

    try {
        const data = await EmpModel.find().populate('department', 'deptname');
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.editData = async (req, res) => {
    try {
        const data = await EmpModel.findById(req.params.id).populate('department','deptname');
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateRecord = async (req, res) => {
    try {
        const id = req.params.id;
        const updateInfo = {
            fname: req.body.fname,
            lname: req.body.lname,
            age: req.body.age,
            salary: req.body.salary,
            department: req.body.department
        }
        const options = { new: true };
        const result = await EmpModel.findByIdAndUpdate(id, updateInfo, options);
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.deleteRecord = async (req, res) => {
   
    try {
        const id = req.params.id;
        const data = await EmpModel.findByIdAndDelete(id);
        res.send(`Document with ${data.fname} has been deleted`);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}