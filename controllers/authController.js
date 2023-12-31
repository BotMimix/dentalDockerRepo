const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.signUp = async (req, res) => {
  const {username, password, role} = req.body

  try {
    const hashpassword = await bcrypt.hash(password, 12)
    const newUser = await User.create({
      username,
      password: hashpassword,
      role
    });
    req.session.user = newUser;
    res.status(201).json({
      status: 'succes',
      data: {
        user: newUser
      }
    })
  } catch (e) {
    res.status(400).json({
      status: 'fail',
    });
  }
};

exports.login = async (req, res) => {
  const {username, password, role} = req.body;

  try {
    const user = await User.findOne({username});
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'user not found'
      })
    }

    const isCorrect = await bcrypt.compare(password, user.password)

    if (isCorrect) {
      req.session.user = user;
      res.status(200).json({
        status: 'succes'
      })
    } else {
      res.status(400).json({
        status: 'fail',
        message: 'incorrect password'
      });
    }
  } catch (e) {
    res.status(400).json({
      status: 'fail',
    });
  }
}