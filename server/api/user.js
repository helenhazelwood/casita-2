const router = require('express').Router();
const db = require('../db')
const UserPlant = db.model('UserPlant')
const User = db.model('user')
const request = require('request');
const { generateUUID } = require('../../util');
module.exports = router;

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(userId, {include: all})
    res.json(user)
  } catch (error) {
    next(error)
  }
})
