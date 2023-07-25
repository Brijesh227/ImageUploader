const express = require('express');
const router = express.Router();
const userService = require('../service/userService');
const { memoryStorageMulter } = require('../middleware/memoryStorageMulter');

router.post('/', memoryStorageMulter.single('profile_pic'), (req,res) => {   
    const { name, email, profile_pic_link_id } = req.body;
    
    const profile_pic = req.file ? req.file : null;
    if(name && email) {
        console.log("lol name",email,name);
        userService.createUser(name, email, profile_pic, profile_pic_link_id)
        .then((user) => {
            res.status(200).json({user});
        })
        .catch((err) => {
            res.status(500).json(err);
        })
    } else {
        res.status(400).json({ err : "name and email is not provided."});
    }
})

router.get('/',(req,res) => {
    userService.getUserList()
    .then((user) => {
        res.status(200).json({user});
    })
    .catch((err) => {
        res.status(500).json(err);
    })
})

router.put('/', memoryStorageMulter.single('profile_pic'), (req,res) => {
    const { name,email } = req.body;
    const profile_pic = req.file ? req.file : null;
    if(name && email && profile_pic) {
        userService.updateUser(name,email,profile_pic)
        .then((user) => {
            res.status(200).json({user});
        })
        .catch((err) => {
            res.status(500).json(err);
        })
    } else {
        res.status(400).json({ err : "required fields are not provided."});
    }
})

router.delete('/:id',(req,res) => {
    const { id } = req.params;
    if(id) {
        userService.deleteUser(id)
        .then((deleteduser) => {
            res.status(200).json({deleteduser});
        })
        .catch((err) => {
            res.status(500).json(err);
        })
    } else {
        res.status(400).json({ err : "id is not provided."});
    }
})

module.exports = { 
    router
}