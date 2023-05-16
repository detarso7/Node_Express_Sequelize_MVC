const User = require("../models/User")

const bcrypt = require('bcryptjs')

module.exports = class AuthController {

    static login (req, res){
        res.render('auth/login')
    }

    static register (req, res){
        res.render('auth/register')
    }

    static async registerPost (req, res){
        console.log(req.body)
        const {name, email, password, confirmpassword} = req.body

        // password match validation
        if(password != confirmpassword){
            req.flash('message', 'As senhas não conferem. Tente novamente')
            res.render('auth/register')

            return
        }
        //await User.create(user)
        res.redirect('/login')
    }

}