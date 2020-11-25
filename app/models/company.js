var mongoose = require('mongoose');

//define schema
var Comment = mongoose.Schema({
    namecp: {type: String, "default": ""},
    avatar: {type: String, "default": ""},
    address: {type: String, "default": ""},
    sizecp: {type: String, "default": ""},
    typecp: {type: String, "default": ""},
    descp: {type: String, "default": ""},
});
//create model
module.exports = mongoose.model('companys', Comment, 'companys');