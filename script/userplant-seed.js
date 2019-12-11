const db = require('../server/db')
const Axios = require('axios')
const {User, Plant} = require('../server/db/models')
const UserPlant = db.model('UserPlant')

async function seed() {
await db.sync()

const plant = await Plant.findByPk(22)

await UserPlant.create({userId: 3, plantId: plant.id})

const joinInstances = await UserPlant.findAll()

console.log(`added ${joinInstances.length} userplants`)

await db.close()
console.log('db connection closed!')
}


async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (error) {
    console.log(error)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if(module === require.main) {
  seed()
}

module.exports = seed
