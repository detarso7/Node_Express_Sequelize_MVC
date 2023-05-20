const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtController{
    static async showTough(req, res) {
        res.render('toughts/home')
    }

    static async dashboard (req, res){
        res.render('toughts/dashboard')
    }

    static createTought(rreq, res){
        res.render('toughts/create')
    }
}