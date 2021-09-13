const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
require('dotenv').config()

const auth = async (req, res, next) => {
  try {
    const authorization = req.header('Authorization')
    const token = authorization.substring(7)

    const decoded = jwt.verify(token, 'secrretasfasdfas')
    const user = await User.findOne({ _id: decoded._id })

    const invalidToken = await User.findOne({
      _id: decoded._id,
      invalidatedTokens: token
    })

    if (invalidToken)
      return res.status(401).send({ error: 'Please authenticate.' })

    if (!user) {
      throw new Error('Please Register first')
    }

    req.token = token
    req.user = user
    next()
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' })
    console.log(e)
  }
}

module.exports = auth