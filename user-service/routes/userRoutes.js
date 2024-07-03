const express = require('express');
const {register,login,getAllUser}=require('../controller/userConroller')

const router = express.Router();

router.post('/register',register);
router.post('/login', login);
router.post('/getuser',getAllUser)

module.exports = router;
