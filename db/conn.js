const {Sequelize} = require('sequelize')

const sequelize = new Sequelize ('postgres://qhpqdmdj:FhVUPiWtk5n_Qx7iSy1QFraYzYn7WmCT@silly.db.elephantsql.com/qhpqdmdj', {
  dialect: 'postgres'
})

try {
    sequelize.authenticate()
    console.log('Banco conectado')
} catch (error) {
  console.log(`Não foi possível conectar: ${error}`)  
}

module.exports = sequelize