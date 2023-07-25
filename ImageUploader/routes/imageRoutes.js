const express = require('express');
const router = express.Router();
const { multerMiddleWare } = require('../middleware/multer');
const fs = require('fs');
const path = require('path');

router.post('/upload/:entity/:id?/:filename_link_id?', multerMiddleWare.single('filename'), (req,res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    if(req.fileName) {
        res.status(200).send(`${req.fileName} uploaded sucessfully`);
    } else {
        res.status(400).send({error: "error in file creation"});
    }
})

router.delete('/:entity/:id', (req,res) => {
    const { entity,id } = req.params;
    if(id) {
        const userDirectory = path.join(__dirname, '..', '..', 'uploads', `${entity}`);
        if(fs.existsSync(userDirectory)){
            fs.readdirSync(userDirectory).forEach((file) => {
                if(file.includes(id)){
                    fs.unlinkSync(path.join(__dirname, '..', '..', 'uploads', `${entity}`, file));
                }
            });
        }
        res.status(200).send("user deleted successfully");
    } else {
        res.status(400).send({error: "error in delete user"});
    }
})

module.exports = { 
    router
}