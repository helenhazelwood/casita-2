const Plant = require('./plant')
const User = require('./user')

User.belongsToMany(Plant, {through: 'UserPlant'})
Plant.belongsToMany(User, {through: 'UserPlant'})


module.exports = {
  Plant,
  User
}
