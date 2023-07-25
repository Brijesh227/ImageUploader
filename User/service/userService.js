const userDB = require('../db');
const axios = require('axios');
const { constructFormdata } = require('../helper/commonFunction');

const createUser = (name,email,profile_pic,profile_pic_link_id, entity = "user") => {
    return new Promise(async (resolve,reject) => {
        try{
            let update_profile_pic;
            if(profile_pic) {
                const formData = await constructFormdata(profile_pic);
                update_profile_pic = await axios.post(`http://localhost:3000/image/upload/${entity}/${name}`,
                                        formData,
                                        {
                                            headers: formData.getHeaders()
                                        });
            } else if(profile_pic_link_id) {
                const formData = await constructFormdata(profile_pic_link_id);
                update_profile_pic = await axios.post(`http://localhost:3000/image/upload/${entity}/${name}/${profile_pic_link_id}`,
                                        formData,
                                        {
                                            headers: formData.getHeaders()
                                        });
            }
            
            const newUser = { 
                name, 
                email, 
                profile_pic: update_profile_pic?.data ?? ""
            };
            userDB.push(newUser);
            resolve(newUser);
        } catch(error) {
            reject(error);
        }
    })
}

const getUserList = () => {
    return new Promise((resolve,reject) => {
        resolve(userDB);
    })
}

const updateUser = (name,email,profile_pic,entity="user") => {
    return new Promise(async (resolve,reject) => {
        try {
            const user = userDB.find((user) => user.name === name);
            if(!user) {
                return reject("user not found")
            }
            const formData = await constructFormdata(profile_pic);
            if(profile_pic){
                let update_profile_pic = await axios.post(`http://localhost:3000/image/upload/${entity}/${name}`,
                                        formData, 
                                        {
                                            headers: formData.getHeaders()
                                        });
                user.name = name;
                user.email = email;
                user.profile_pic = update_profile_pic.data;
            }
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}

const deleteUser = (name, entity="user") => {
    return new Promise(async (resolve,reject) => {
        try{
            if(name){
                const foundIndex = userDB.findIndex((user) => user.name === name);
                if(foundIndex === -1) {
                    return reject("user not found")
                }
                const response = await axios.delete(`http://localhost:3000/image/${entity}/${name}`)
                userDB.splice(foundIndex,1);
                resolve(response.data);
            }
        } catch(error) {
            reject(error);
        }
    })
}

module.exports = {
    createUser,
    updateUser,
    getUserList,
    deleteUser
}