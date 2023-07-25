const multer = require('multer');

const storage = multer.memoryStorage();
const memoryStorageMulter = multer({
    storage: storage
});

module.exports = {
    memoryStorageMulter
}