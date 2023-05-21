const Tought = require('../models/Tought')
const User = require('../models/User')

const {Op} = require('sequelize')

module.exports = class ToughtController{
    static async showTough(req, res) {

        // Pesquisa
        let search = ''

        if(req.query.search){
            search = req.query.search
        }

        // Ordenação
        let order = 'DESC'

        if(req.query.order === 'old'){
            order = 'ASC'
        }else{
            order = 'DESC'
        }

        
        const toughtsData =  await Tought.findAll({
            include: User,
            where: {title: {[Op.like]: `%${search}%`}},
            order: [['createdAt', order]]
        })

        const toughts = toughtsData.map((result) => result.get({plain: true}))

        let toughtsQty = toughts.length

        if(toughtsQty === 0){
            toughtsQty = false
        }

        res.render('toughts/home', {toughts, search, toughtsQty} )
    }

    static async dashboard (req, res){

        const userId = req.session.userid

        const user = await User.findOne({
            where: {id: userId},
            include: Tought,
            plain: true
        })

        // Check User
        if(!user){
            res.redirect('/login')
        }

        // Separando os Pensamentos
        const toughts = user.Toughts.map((result) => result.dataValues)

        // Checando lista vazia
        let emptyToughts = false

        if (toughts.length === 0){
            emptyToughts = true
        }

        res.render('toughts/dashboard', {toughts, emptyToughts})
    }

    static createTought(req, res){
        res.render('toughts/create')
    }

    static async createToughtPost(req, res){
        const Toughts = {
            title: req.body.title,
            UserId: req.session.userid
        }

        
        try {

            await Tought.create(Toughts)

            req.flash('message', 'Pensamento criando com sucesso')
    
            req.session.save(()=>{
                res.redirect('/toughts/dashboard')
            })

        } catch (error) {
            console.log(error)
        }

    }

    static async toughtDelete (req, res){
        const id = req.body.id
        const UserId = req.session.userid

        try {

            await Tought.destroy({where: {id: id, UserId: UserId}})

            req.flash('message', 'Pensamento removido com sucesso')
         
            req.session.save(()=>{
                res.redirect('/toughts/dashboard')
            }) 

        } catch (error) {
            console.log(error)
        }

    }

    static async toughtEdit(req, res){
        const id = req.params.id
        const UserId = req.session.userid

        const toughts = await Tought.findOne({where: {id: id, UserId: UserId}, raw: true})

        res.render('toughts/edit', {toughts})
    }

    static async toughtEditPost (req, res){
        const {id, title} = req.body
        const UserId = req.session.userid

        try {

            await Tought.update(title, {where: {id: id, UserId: UserId}})

            req.flash('message', 'Pensamento ATUALIZADO com sucesso')
             
            req.session.save(()=>{
                res.redirect('/toughts/dashboard')
            }) 

        } catch (error) {
            console.log(error)
        }

    }
}