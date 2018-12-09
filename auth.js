const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.autheticate = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try{
            // Get user by Email
            const user = await User.findOne({email});

            // Match Password

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                    resolve(user);
                }else{
                    //Password did not match
                    reject('Authentication is failed');
                }
            });
        }catch(err){
            // Email not found
            reject('Authentication failed');
        }
    });
}