var mongoose = require('mongoose');

const newsModel = new mongoose.Schema({
    inputTitle: {type:String},
    inputDesc: {type:String},
    inputUrl: {type:String},
    inputImg: {type:String},
    inputTime: { type: Date }
})

module.exports = mongoose.model('newsModel', newsModel);