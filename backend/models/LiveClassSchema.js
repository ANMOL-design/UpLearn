const mongoose = require("mongoose");


const liveClassSchema = new Schema({
    className : {
        type : String,
    },
    classDescription : {
        type : String
    },
    ClassThumbnailImage:{
        type : String
    },
    classSection : {
        type : String
    },
    classDatePost : {
        type : Date , default : Date.now()
    },
    classScheduleDate : {
        type : Date , default : Date.now()
    },
    classScheduleTime : {
        type :String
    },

    classLevel : {
        type : Number
    },
    classStatus : {
        type : String , default : "Active"
    },
    classOwner :{
        type: Schema.Types.ObjectId,
        ref : 'INSTRUCTORS'
    },
    classUsers :[{
        type: Schema.Types.ObjectId,
        ref : 'USER'
    }],
})

const LIVECLASS = mongoose.model("LIVECLASSES", liveClassSchema);
module.exports = LIVECLASS;