const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store') (session)
const flash = require ('express-flash')

const app = express()

const conn = require('./db/conn')
const { DataTypes } = require('sequelize')

//Tamplate engine
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

//Receber resposta do body
app.use(express.json())

// Session Midlleware
app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',
        saveUninitialized: false,
        store: new FileStore({
            logFn: function () {},
            path: require('path').join(require('os').tmpdir(), 'session')
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date (Date.now() + 360000),
            httpOnly: true
        }
    })
)

//Flash Message

app.use(flash())

//Public Path

app.use(express.static('public'))

//Set Session to res

app.use((req, res, next)=> {
    if(req.session.userId){
        res.locals.session = req.session
    }
    next()
}) 

conn
.sync()
.then(()=>{
    app.listen(3000, ()=>{
        console.log('Conectado na porta 3000')
    })
})
.catch((error)=>{
    console.log(`Não foi possível conectar: ${error}`)
})