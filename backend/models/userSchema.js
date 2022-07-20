const mongoose = require("mongoose");
const bycrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
   name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    },
    firstName : {
        type: String,
    },
    LastName : {
        type: String,
    },
    class :{
        type : Number,
    },
    Board :{
        type : String,
    },
    PermanentAddress :{
        type : String,
    },
    School :{
        type : String,
    },
    City :{
        type : String,
    },
    State :{
        type : String,
    },
    Pincode :{
        type : Number,
    },
    mobileno :{
        type :Number,
    },
    Image : {
        type : String,
    },
    isInstructor :{
        type : Boolean,
    },
    progress : {
        type : Number,
    },
    certificates :[{
        nameofcertificate:{
            type : String,
        },
        issuedby : {
            type : String,
        },
        certificateimage :{
            type : String,
        }
    }], 
    CousesEnrolled :[{
        nameOfCourse:{
            type : String,
        },
        CourseId : {
            type : String,
        }
    }], 
    following :[{
        instructorId : {
            type : String,
        }
    }]

    
    
    
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bycrypt.hash(this.password, 12);
        this.cpassword = await bycrypt.hash(this.cpassword, 12);
    }
    next();
})


const User = mongoose.model("USER", userSchema)
module.exports = User;