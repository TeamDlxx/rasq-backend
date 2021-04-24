const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {  find_user } = require('../DAL/login');
const _login_user = async (body,resp) => { 
    const user = await find_user(body);
    if (!user) {
        resp.error = true;
        resp.error_message = 'Invalid Email or Password';
        return resp;
    }  

    const isValidPassword = await bcrypt.compare(body.password, user.password);

    if (!isValidPassword) {
        resp.error = true;
        resp.error_message = 'Invalid Email or Password';
        return resp;
    }  
    
    // const token = jwt.sign({'_id': user._id, 'role': user.role},  process.env.JWT_SECRET);

            //generating token'
            const access = "auth";
            const json_token = uuidv1();
            const token = jwt
            .sign({ _id: json_token, access }, process.env.JWT_SECRET)
            .toString();

            const add_session = await add_to_session(json_token, user._id);

    resp.data = { 
        token:token
    };

    return resp;
} 
 
const login_user = async (body) => {
    let resp = {
        error: false,
        auth: true,
        error_message: '',
        data: {}
    };

    resp = await _login_user(body, resp);
    return resp;
}

module.exports = {
    login_user 
};