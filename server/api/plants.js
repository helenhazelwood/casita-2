const router = require('express').Router();
const Plant = require('../db/models/plant');
const db = require('../db')
const UserPlant = db.model('UserPlant')
const request = require('request');
const { generateUUID } = require('../../util');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const plants = await Plant.findAll();
    res.status(200).json(plants);
    console.log('SESSION', req.session);
  } catch (error) {
    next(error);
  }
});

router.get('/:plantId', async (req, res, next) => {
  try {
    const plant = await Plant.findByPk(req.params.plantId);
    res.status(200).json(plant);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newPlant = await Plant.create({
      name: req.body.plant.name,
      description: req.body.plant.description,
      sunlight: req.body.plant.sunlight,
      size: req.body.plant.size,
      petFriendly: req.body.plant.petFriendly
    });
    if (req.files) {
      let imageBuffer = Buffer.from(req.files.file.data);
      let image = imageBuffer.toString('base64');
      await newPlant.update({imageURL: image})
    }
    if(req.body.userId) {
      await UserPlant.create({userId: req.body.userId, plantId: newPlant.id})
    }
    res.status(201).json(newPlant)
  } catch (error) {
    next(error);
  }
});



router.post('/:plantId/:userId', async (req, res, next) => {
  try {
    const newUserPlant = await UserPlant.create({userId: req.params.userId, plantId: req.params.plantId})
    res.status(201).send('Plant added')
  } catch (error) {
    next(error)
  }
})

router.put('/:plantId', async (req, res, next) => {
  try {
    let plant = await Plant.findByPk(req.params.plantId)
    await plant.update(req.body)
    res.status(201).send('Plant updated')
  } catch (error) {
next(error)
  }
})
