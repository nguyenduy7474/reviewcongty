var Company = require('../models/company');
var Comment = require('../models/comment');
var User = require('../models/user');
var base64 = require('base-64');

class Home {
    static Home(req, res){
       console.log(req.session)
/*        res.cookie('admin', base64.encode("false"))*/
        res.render("index")
    }
//aSBhbSBhZG1pbiBub3QgdXNlcg==
    static Admin(req, res){
        if(req.session.user || base64.decode(req.cookies.admin) == "i am admin not user"){
            req.session.user = "admin"
            req.session.save((err) =>{
                res.cookie('admin', base64.encode("i am admin not user"))
                res.render("admin")
            })
        }else{
            res.redirect("/login")
        }
    }

    static Login(req, res){
        console.log(req.cookies)
        if(req.session.user || (req.cookies.admin && base64.decode(req.cookies.admin) == "i am admin not user")){
            console.log("aaa")
            res.cookie('admin', base64.encode("i am admin not user"))
            //req.session.user = "admin"
            res.redirect("/admin")
        }else{
            res.render("login")
        }
    }

    static LoginValidate(req, res){
        User.findOne({username: req.body.username, pass: req.body.pass}, (err, found) =>{
            if(found){
                console.log("bbb")
                req.session.user = found
                res.send({success: true})
            }else{
                console.log("aaa")
                res.send({message: "Sai tài khoản và pass", success: false})
            }
        })
    }

    static UploadCp(req, res){
        console.log(req.body)
        var newcp = Company({
            namecp: req.body.namecp,
            avatar: req.body.avatar,
            address: req.body.address,
            sizecp: req.body.sizecp,
            typecp: req.body.typecp,
            descp: req.body.descp,
        })

        newcp.save(() => {
            res.send({success: true})
        })

    }

    static async GetAllCompany(req, res){
        var cpmpanys = await Company.find({})
        var comment10 = await Comment.find({}).sort('-datecreate').limit(10).exec()
        res.send({cpmpanys: cpmpanys, comment10: comment10})
    }

    static async SaveChangeCompany(req, res){
        var datacp = await Company.find({_id: req.body.id})
        if(datacp){
            await Company.updateOne({_id: req.body.id}, {$set: {namecp: req.body.editnamecp, avatar: req.body.editavatarcp, sizecp: req.body.editsizecp, typecp: req.body.edittypecp, descp: req.body.editdescp, address: req.body.editaddresscp}})
            res.send({success: true})
        }
    }

    static DeleteCompany(req, res){
        console.log(req.body.id)
        Company.deleteOne({_id: req.body.id}, () => {
            res.send({success: true})
        })
    }

    static DetailCompany(req, res){
        Company.findOne({_id: req.params.id}, (err, found) => {
            if(found){
                res.render("detail", {data: found})
            }else{
                res.render("index")
            }
        })
    }

    static UploadComment(req, res){
        console.log(req.body)
        Company.findOne({_id: req.body.companyid}, (err, found) => {
            if(found){
                var newComment = Comment({
                    companyid: req.body.companyid,
                    nickname: req.body.nickname,
                    comment: req.body.comment,
                    namecp: found.namecp,
                    datecreate: new Date()
                })
                newComment.save(() => {
                    res.send({success: true})
                })
            }
        })

    }

    static GetCommentbycp(req, res){
        Comment.find({companyid: req.body.id}, (err, found) => {
            res.send(found)
        })
    }

    static DeleteCmt(req, res){
        Comment.deleteOne({_id: req.body.id}, (err, found) => {
            res.send({success: true})
        })
    }

    static getFlag(req, res){
        console.log(req.session)
        if(req.session.user){
            res.send("FLAG{NHO_DEO_KHAU_TRANG}")
        }else{
            res.send("you win, if you are admin")
        }
    }

    static async searchCompany(req, res){
        let {input}=req.body
        let match = {
            $and: [] 
        }
        // defined data will send to client
        let project = {
            namecp :'$namecp',
        }
        if(input){
            match.$and.push({'namecp': {$regex: input,$options:"xi"}})
        }
        try{
            let data = await Company.aggregate([{$match:match},{$project:project}])
            res.send(data)
        }catch(err) {
            console.log(err.message)
        }
    }
}

module.exports = Home




