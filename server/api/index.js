const router = require('express').Router();
module.exports = router;

router.use('/express_test', require('./express'));

router.use(function(req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});
