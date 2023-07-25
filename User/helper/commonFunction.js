const FormData = require('form-data');

module.exports.constructFormdata = (profile_pic) => {
    const formData = new FormData();
    console.log('lol pro',profile_pic);
    if(profile_pic.buffer) {
        formData.append('filename', profile_pic.buffer, {
            filename: profile_pic.originalname,
            contentType: profile_pic.mimetype
        });
    } else {
        formData.append('filename', profile_pic, {
            filename: 'filename',
        });
    }
    return formData;
}