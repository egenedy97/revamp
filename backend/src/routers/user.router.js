const express = require('express') ; 
const auth = require('../middleware/auth')
const router = new express.Router()

const {register , login , logout , deleteUser , updateUser} = require('../controller/userController') ; 

router.post('/register' , register) ; 
router.post('/login' , login) ; 
router.post('/logout' ,auth, logout) ; 
router.put('/edit/:id' ,auth, updateUser) ; 
router.delete('/deleteUser' ,auth, deleteUser) ;  

module.exports = router ; 