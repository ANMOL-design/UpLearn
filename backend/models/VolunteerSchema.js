const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const VolunteerSchema = new mongoose.Schema({
  Volunteername: {
    type: String,
    required: true,
  },
  Volunteeremail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  block: {
    type: String,
    required: true,
  },
ViLL_city: {
    type: String,
    required: true,
  },
  District: {
    type: String,
    required: true,
  },
  State: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  mobileno: {
    type: Number,
    required: true,
  },
  idImage: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  Govt_assign_id: {
    type:String,
    required: true,
  },
  aadharCard: {
    type: Number,
    required: true,
  },
  AadharcardImage: {
    type: String,
    required: true,
  },
  MyBlockStudents:[
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
       
        classes: {
            type: Number,
        },
        Board: {
            type: String,
        },
        School: {
            type: String,
        },
        City: {
            type: String,
        },
        State: {
            type: String,
        },
        Pincode: {
            type: Number,
        },
        mobileno: {
            type: Number,
        },
        Gender: {
            type: String,
        },
        DOB: {
            type: String,
        }
    }
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// VolunteerSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bycrypt.hash(this.password, 12);
//   }
//   next();
// });
VolunteerSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const Volunteers = mongoose.model("VOLUNTEERSCHEMA", VolunteerSchema);
module.exports = Volunteers;
