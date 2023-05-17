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

        // Check email
        const checkIfUserExists = await User.findOne({where:{email: email}})

        if(checkIfUserExists){
            req.flash('message', 'O email já existe. Vá para página login')
            res.render('auth/register')

            return
        }

        // Create a Hash Password
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword
        }

        try {
            
            const creatUser = await User.create(user)

            // Initialize Session
            req.session.userid = creatUser.id 

            req.flash('message', 'Cadastro realizado com sucesso!')

            // Save Session
            req.session.save(()=>{
                 res.redirect('/') 
            })

              

        } catch (error) {

            console.log(error)

        }

    }

        // Logout
    static logout (req, res){
        req.session.destroy()
        res.redirect('/login')
    }

}