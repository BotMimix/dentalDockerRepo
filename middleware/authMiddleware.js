const protect = (req, res, next) => {
  const {user} = req.session;

  if (!user) {
    return res.status(401).json({status: 'fail', message: 'unauthorized'})
  }

  req.user = user;

  next() // it will send it to the next middleware or the controller.
}

module.exports = protect;