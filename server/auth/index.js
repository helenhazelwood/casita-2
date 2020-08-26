const router = require('express').Router();
const User = require('../db/models/user');
const Plant = require('../db/models/plant')

module.exports = router;
router.post('/login', async (req, res, next) => {
  try {
    const candidate = await User.findOne({ where: { email: req.body.email } });
    if (!candidate) {
      console.log('No such user found:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else if (!candidate.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else {
      const user = await User.findByPk(candidate.id, {
        include: Plant,
      });
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (error) {
    next(error);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(error);
    }
  }
});

router.post('/logout', (req, res) => {
  console.log('LOGGING OUT', req.passport)
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {

  res.send(req.user);
});
