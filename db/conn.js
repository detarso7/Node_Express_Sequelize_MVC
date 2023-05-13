const {Sequelize} = require('sequelize')

const sequelize = new Sequelize ('thinking', 'root', 'Moscas@132', {
    host:'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Banco conectado')
} catch (error) {
  console.log(`Não foi possível conectar: ${error}`)  
}

module.exports = sequelize