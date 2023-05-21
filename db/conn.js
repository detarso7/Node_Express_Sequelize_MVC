const {Sequelize} = require('sequelize')

const sequelize = new Sequelize (
        'postgres://gksdtxus:TviBo4h-ZC-bSbaqqu_l-0EX0aTZ8ARl@silly.db.elephantsql.com/gksdtxus', {
        dialect: 'postgres'
})

try {
    sequelize.authenticate()
    console.log('Banco conectado')
} catch (error) {
  console.log(`Não foi possível conectar: ${error}`)  
}

module.exports = sequelize