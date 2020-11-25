var Company = require('../models/company');
var Comment = require('../models/comment');
var User = require('../models/user');

class Home {
    static Home(req, res){
        res.render("index")
    }

    static Admin(req, res){
        console.log(req.session.user)
        if(req.session.user){
            res.render("admin")
        }else{
            res.redirect("/login")
        }

    }

    static Login(req, res){
        if(req.session.user){
            res.redirect("/admin")
        }else{
            res.render("login")
        }
    }

    static LoginValidate(req, res){
        console.log(req.body)
        User.findOne({username: req.body.username, pass: req.body.pass}, (err, found) =>{
            console.log(found)
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
}

module.exports = Home




