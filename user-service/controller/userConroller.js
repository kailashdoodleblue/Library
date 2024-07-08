const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
require('dotenv').config();

const register = async (req, res) => {
    try {
        const { username, password,LibraryPass,email } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword ,LibraryPass,email});
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ error: err.message});
    }
}

const login =async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id,username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
}

const getAllUser=async(req,res)=>{
    try{
        // const {userID}=req.params.id
        const users = await User.findByPk(req.params.id)
        // console.log(users)
        res.status(200).json(users)
    }
    catch(err){
        res.status(500).json({ error: 'Error' });
    }
}
module.exports={register,login,getAllUser}