var mongoose = require('mongoose');

//define schema
var Comment = mongoose.Schema({
    companyid: { type : String , "default" : "" },
    nickname: { type : String , "default" : "" },
    comment: { type : String , "default" : "" },
    namecp: { type : String , "default" : "" },
    datecreate: { type : Date},
});
//create model
module.exports = mongoose.model('comments', Comment, 'comments');