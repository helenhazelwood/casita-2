const Plant = require('./plant')
const User = require('./user')

User.hasMany(Plant)


module.exports = {
  Plant,
  User
}
