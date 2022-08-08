const mongoose = require('mongoose');

const newsScheme = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    idx: {
        type: Number,
    },
    title:{
        type: String,
    },
    newsdate:{
        type: String,
    },
    abstracts:{
        type:[String],
    },
    img:{
        type:String,
    },
    content:{
        type:String,
    },
})


const Mynews = mongoose.model("mynews", newsScheme, "mynews")
module.exports = Mynews;

