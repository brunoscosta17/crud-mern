const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/', async (req, res) => {
    const users = await User.find();    
    res.json(users);
});

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id); 
    res.json(user);
});

router.post('/', async (req, res) => {
    const { name, email, phone, birth } = req.body;
    const user = new User({
        name,
        email,
        phone,
        birth
    });
    await user.save();
    res.json({status: 'User saved!'});
});

router.put('/:id', async (req, res) => {
    const { name, email, phone, birth } = req.body;
    const newUser = { name, email, phone, birth };
    await User.findByIdAndUpdate(req.params.id, newUser);
    res.json({status: 'User updated!'})
});

router.delete('/:id', async (req, res) => {
    await User.findByIdAndRemove(req.params.id);
    res.json({status: 'User removed!'})
});

module.exports = router;