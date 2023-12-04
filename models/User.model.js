const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        required: false,
        default: Date.now()
    },
    role: {
        type: String,
        enum: {
          values: ["admin", "user"],
          message: "the value must be either 'admin','user'",
        },
        default: "user",
      },
});

// Do thing to the schema before saving
userSchema.pre("save", function(next){
    this.id = String(this._id);
    next();
})

const User = mongoose.model("User", userSchema);
module.exports.User = User;