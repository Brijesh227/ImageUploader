const path = require('path');
const fs = require('fs');

module.exports.findAssociatedUserFile = (entity,id,isTempFile) => {
    try{
        const userDirectory = isTempFile ? path.join(__dirname, '..', '..', 'uploads', `${entity}`, 'temp') : path.join(__dirname, '..', '..', 'uploads', `${entity}`);
        if(fs.existsSync(userDirectory)){
            let fileList = [];
            fs.readdirSync(userDirectory).forEach((file) => fileList.push(file));
            if(fileList.length > 0){
                return fileList.find((file) => file.includes(id));
            }
        }
        return undefined;
    } catch {
        throw new Error("Error in checking associated file in directory");
    }
}