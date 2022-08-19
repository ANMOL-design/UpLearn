const mongoose = require("mongoose");


const liveClassSchema = new mongoose.Schema({
    ClassName : {
        type : String,
    },
    ClassDescription : {
        type : String
    },
    meetingId:{
        type : String
    },
    Class :{
        type : String
    },
    Subject :{
        type : String
    },
    classDatePost : {
        type : Date , default : Date.now()
    },
    classScheduleDate : {
        type : Date , default : Date.now()
    },
    classScheduleTime : {
        type : String
    },
    Notes : [{
     NotesName :{
        type : String ,
     },
     NotesData :{
        type : String ,
     },
    }],
    Notice : [{
     NoticeTitle :{
        type : String ,
     },
     NotesDescription :{
        type : String ,
     },
    }],
    classStatus : {
        type : String , default : "Active"
    },
    classOwner :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'INSTRUCTORS'
    },
    classUsers :[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'USER'
    }],
})

const LIVECLASS = mongoose.model("LIVECLASSES", liveClassSchema);
module.exports = LIVECLASS;