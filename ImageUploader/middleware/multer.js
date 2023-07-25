const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { findAssociatedUserFile } = require('../helper/findAssociatedUserFile');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(req.params.id){
            cb(null, path.join(__dirname, '..', '..', 'uploads', `${req.params.entity}`));
        } else {
            cb(null, path.join(__dirname, '..', '..', 'uploads', `${req.params.entity}`, 'temp'));
        }
    },
    filename: async function (req, file, cb) {
      const { entity, id, filename_link_id } = req.params;
      let fileName,associatedFile;
      if(id) {
        if(filename_link_id) {
            associatedFile = await findAssociatedUserFile(entity,filename_link_id,true);
            if(associatedFile) {
                fs.unlinkSync(path.join(__dirname, '..', '..', 'uploads', `${entity}`, 'temp', associatedFile));
            }
            fileName = `${associatedFile.split("-")[0]}-${id}-${associatedFile.split("-")[1]}`;
        } else {
            associatedFile = await findAssociatedUserFile(entity,id);
            if(associatedFile) {
                fs.unlinkSync(path.join(__dirname, '..', '..', 'uploads', `${entity}`, associatedFile))
            }
            fileName = `${Date.now()}-${id}-${file.originalname}`
        }
      } else {
        fileName = `${Date.now()}-${file.originalname}`;
      }
      req.fileName = fileName;
      cb(null, fileName) 
    }
  })

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG and PNG files are allowed.'));
  }
}

const multerMiddleWare = multer({ 
    storage: storage,
    fileFilter: fileFilter 
});

module.exports = {
    multerMiddleWare
}