const mongoose = require("mongoose");
const bycrypt = require('bcrypt');
const instructorSchema = new mongoose.Schema({
   Teachername: {
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
        required: true
    },
    cpassword: {
        type: String,
        required: true,
    },
    subject:{
        type : String,
        required: true,
    },
    Block:{
        type : String,
        required: true,
    },
    PermanentAddress :{
        type : String,
        required: true,
    },
    School :{
        type : String,
        required: true,
    },
    City :{
        type : String,
        required: true,
    },
    State :{
        type : String,
        required: true,
    },
    Pincode :{
        type : Number,
        required: true,
    },
    mobileno :{
        type :Number,
        required: true,
    },
    Id_Image : {
        type : String,
        required: true,
    },
    Image : {
        type : String,
        required: true,
    },
    isInstructor :{
        type : Boolean,
        default : true,
        required: true,
    },
    teacher_id : {
        type : Number,
        required: true,
    },
    Aadharcard : {
        type : Number,
        required: true,
    },
    AadharcardImage : {
        type : String,
        required: true,
    },

    CousesList :[{
        nameOfCourse:{
            type : String,
        },
         courseId :{
            type : String,
         }
    }], 
    followers :[{
        studentId : {
            type : String,
        }
    }]

    
    
    
});

instructorSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bycrypt.hash(this.password, 12);
        this.cpassword = await bycrypt.hash(this.cpassword, 12);
    }
    next();
})


const Instructors = mongoose.model("INSTRUCTORS", instructorSchema)
module.exports = Instructors;