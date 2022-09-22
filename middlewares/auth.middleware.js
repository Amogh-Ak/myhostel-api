const jwt = require('jsonwebtoken');
const Users = require('../models/User.model');

module.exports = (req, res, next) => {
  try {

    if (!req.headers.authorization) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }

    const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    req.userId = decoded.id;
    // console.log('In middleware Auth ' + decoded.id)
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ msg: 'Unauthorized' });
  }
};

