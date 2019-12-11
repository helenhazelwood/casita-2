const router = require('express').Router();
const User = require('../db/models/user');

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
        include: [{ all: true }],
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
  console.log('LOGGING OUT', req.passport);
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    include: [{ all: true }],
  });
  res.send(user);
});
