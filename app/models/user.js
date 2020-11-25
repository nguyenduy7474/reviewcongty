var mongoose = require('mongoose');

//define schema
var Comment = mongoose.Schema({
    username: {type: String, "default": ""},
    pass: {type: String, "default": ""},
});
//create model
module.exports = mongoose.model('user', Comment, 'user');