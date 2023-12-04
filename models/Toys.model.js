const mongoose = require("mongoose");

const toySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    img_url: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    date_created: {
        type: Date,
        required: true,
        default: Date.now()
    },
    user_id:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      }
});

const Toy = mongoose.model("Toy", toySchema);
module.exports.Toy = Toy;