var path = require('path');
var home = require('../app/controllers/home');

module.exports = function (app, passport) {
    app.get('/', home.Home);
    app.get('/admin', home.Admin);
    app.get('/login', home.Login);
    app.post('/uploadcp', home.UploadCp);
    app.post('/getallcompany', home.GetAllCompany);
    app.post('/savechangecompany', home.SaveChangeCompany);
    app.post('/deletecompany', home.DeleteCompany);
    app.get('/detailcompaney/:id', home.DetailCompany);

    app.post('/uploadcoent', home.UploadComment);
    app.post('/getcommentbycp', home.GetCommentbycp);
    app.post('/deletecmt', home.DeleteCmt);
    app.post('/loginvalidate', home.LoginValidate);

    app.post('/getflag', home.getFlag);
}
