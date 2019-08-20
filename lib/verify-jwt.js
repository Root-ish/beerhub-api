function verifyJwt(req, res, next) {
  if (!req.headers['authorization']) {
    res.status(401).json({
      message: 'Unautharized, you need a token'
    })
  } else {
    const token = req.headers['authorization'].split(' ')[1]

    req.token = token
    next()
  }
}

module.exports = verifyJwt
