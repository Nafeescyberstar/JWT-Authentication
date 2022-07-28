const express = require('express');
const router = express.Router();
const EmpController = require('../controllers/empcontroller');
const DeptController = require('../controllers/deptcontroller');
const LoginRegisterController = require('../controllers/LoginRegister');
const auth = require('../Auth.js')
//Get all Method
router.get('', EmpController.index);

//Post method
router.post('/adduser', EmpController.adduser);

router.get('/edit/:id', EmpController.editData);
//Update by ID Method
router.patch('/update/:id', EmpController.updateRecord);

//Delete by ID Method
router.delete('/delete/:id', EmpController.deleteRecord);

router.post('/adddept', DeptController.adddept);
router.get('/alldept', DeptController.alldept);

router.post('/register', LoginRegisterController.register);
router.post('/login', LoginRegisterController.login)
module.exports = router;