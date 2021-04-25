const {AdminUser}     = require('../../src/models/admin_users'); 

//creating admin 
const  signupAdmin = async (body, user_id) => { 
    let admin_user = new AdminUser({
        user_id    : user_id,
        first_name : body.first_name,
        last_name  : body.last_name,
        address    : body.address, 
        profile_image    : 'picture', 
        contact_number   : body.contact_number,
        status           : body.status,
        role             : body.role
    });

    admin_user = await admin_user.save(); 
    return admin_user;
};

// Getting Admin Details
const detailAdmin = async (user_id) => {
    const admin = AdminUser.findOne({'user_id': user_id}).populate('user_id', 'email');
    return admin;
};

module.exports = {
    signupAdmin,
    detailAdmin
};