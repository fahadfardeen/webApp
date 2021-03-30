var mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: {type:String},
    desc: {type:String},
    url: {type:String},
    img: {type:String},
    CreatedOn: { type: Date }
})

module.exports = mongoose.model('news', NewsSchema);