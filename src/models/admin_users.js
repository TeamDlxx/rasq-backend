const mongoose = require("mongoose");
const timestamps = require('mongoose-timestamp');
const _ = require('lodash');
const Joi = require("joi");

const adminUserSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true,
        trim:true,
    },
    first_name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20,
        trim:true, 
    },
    last_name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:20,
        trim:true
    },
    address:{
        type:String,  
        trim:true
    },
     profile_image:{
        type:String, 
        trim:true
    }, 
    contact_number:{
        type:String,
        trim:true,
        default:''
    },
    status:{
        type:Boolean,
        required:true,
        default:false
    },
    role:{
        type: String,
        required: true,
        enum: ['superadmin', 'admin', 'user'],
        default: "admin"
    },
    verification_code:{
        type:String,
        trim:true,
        default:''
    },
    is_send_code:{
        type:Boolean,
        default:false
    },
    is_verified_code:{
        type:Boolean,
        default:false
    }
});

adminUserSchema.plugin(timestamps);

adminUserSchema.methods.toJSON = function () {
    const adminUser       = this;
    const adminUserObject = adminUser.toObject();
    const adminUserJson   = _.pick(adminUserObject, ['_id', 'user_id', 'first_name', 'last_name', 'address','email','profile_image',
    'contact_number','status','role','createdAt','updatedAt']);
    return adminUserJson;
}; 


const adminUser = mongoose.model("adminUser", adminUserSchema);
exports.AdminUser = adminUser; 