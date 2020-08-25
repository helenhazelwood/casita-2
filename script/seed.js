const db = require('../server/db')
const Axios = require('axios')
const {User, Plant} = require('../server/db/models')

async function seed() {
  await db.sync()
  console.log('db synced!')
//waiting on users model
  const users = await Promise.all([
    User.create({email: 'gardener@email.com', password: '123'}), User.create({email: 'alfie@email.com', password: '123'}),
    User.create({email: 'helen@email.com', password: '123'})
  ]);
  //this needs tinkering
  const prods = await JSON.parse(Axios.get('https://www.thesill.com/products.json')).products

  for(var i=0; i < prods.length; i++) {
    var current_prod = prods[i]
    if (current_prod.tags.indexOf('liveplant') > -1) {
        console.log(current_prod.title)
    }
  }

  const plants = await Plant.findAll()

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${plants.length} plants`)
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
  runSeed()
}

module.exports = seed
