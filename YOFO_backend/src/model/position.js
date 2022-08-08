const mongoose = require('mongoose');
var positionSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    id: { type: Number },
    title1: { type: String },
    description1: { type: String },
    description2: { type: String },
    email: { type: String },
    img:{ type: String},
    salary:{type: String}
  });
  var Position = new mongoose.model("posi", positionSchema, "posi");
  module.exports = Position;