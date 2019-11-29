const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const mailSchema = new mongoose.Schema({
  subject:{
    type:String,
    required: 'Title is required',
    minlength: 4,
    maxlength:150
  },
  body:{
    type:String,
    required:'Body is required',
    minlength:4,
    maxlength:2000,
  },
  author:{
    type: ObjectId,
    ref: 'User'
  },
  reciever:{
    type:String,
    required:'Reciever is required',
    minlength: 4,
    maxlength:150
  },
  created:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model('Mail',mailSchema);
