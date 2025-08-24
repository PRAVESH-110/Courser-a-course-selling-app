const mongoose= require("mongoose");
const zod=require('zod');
const bcrypt=require('bcrypt');

const Schema=mongoose.Schema;
const ObjectId= mongoose.Types.ObjectId;


const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    googleId: {type: String, unique: true, sparse: true}, // For Google authentication
    authMethod: {type: String, enum: ['local', 'google'], default: 'local'} // Track authentication method
});
const adminSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
});
const courseSchema =new Schema({
    imageURL: String,
    title: String,
    description: String,
    price: Number,
    creatorID: ObjectId
});
const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
});

const userModel = mongoose.model("user",userSchema);
const adminModel = mongoose.model("admin",adminSchema);
const courseModel = mongoose.model("course",courseSchema);
const purchaseModel = mongoose.model("purchase",purchaseSchema);

module.exports={
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}