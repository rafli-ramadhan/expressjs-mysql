const User = require("../Models").User;
const createError = require('http-errors')
const { registerSchema, loginSchema } = require('../helpers/validation_schema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  signAccessToken,
  verifyAccessToken,
} = require('../helpers/jwt_helper')

module.exports = {
  register: async (req, res, next) => {
    try {
      // validation
      // if (!name || !email || !password || !gender || !role) throw createError.BadRequest()
      const body = await registerSchema.validateAsync(req.body)
      // if email already exist
      const doesExist = await User.findOne({
        where: {
          email: req.body.email
        }
      })
      if (doesExist)
        throw createError.Conflict(`${body.email} is already been registered`)
      const user = new User(body)
      // hash password asynchronously
      // const encryptedPassword = bcrypt.hashSync(req.body.password, 10);
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(user.password, salt)
      user.password = hashedPassword
      
      const savedUser = await user.save()
      console.log(savedUser.id)

      const accessToken = await signAccessToken(savedUser.id)
      console.log(accessToken)      
      res.status(200).send({
        id: savedUser.id,
        accessToken: accessToken
      })
    } catch (error) {
      if (error.isJoi === true) error.status = 422
      next(error)
    }
  },

  login: async (req, res, next) => {
    try {
      // validation
      const body = await loginSchema.validateAsync(req.body)
      // if email not exist
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      })
      if (!user) throw createError.NotFound('User not registered')
      console.log(user.id)
      // comparing passwords asynchronously
      // const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      const isMatch = await bcrypt.compare(body.password, user.password);
      if (!isMatch)
        throw createError.Unauthorized('Email/password not valid')
      console.log(isMatch)

      const accessToken = await signAccessToken(user.id)
      console.log(accessToken)

      res.status(200).send({ 
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token: accessToken,
      })
    } catch (error) {
      console.log(error)
      if (error.isJoi === true)
        return next(createError.BadRequest('Invalid email/password'))
        console.log(error.isJoi)
      next(error)
    }
  },

  userAuthorization: async (req, res, next) => {
    if (!req.headers['authorization']) return next(createError.Unauthorized())
    const authHeader = req.headers['authorization']
    const bearerToken = authHeader.split(' ')
    const token = bearerToken[1]
    // decoded JWT Token
    // const decodedResult = jwt.verify(token, process.env.JWT_SECRET);
    const decodedResult = await verifyAccessToken(token)
    console.log(decodedResult.id)

    try {
      const user = await User.findOne({
        where: {
          id: decodedResult.id
        }
      })
      console.log(user.id)

      if (user.role === 'admin') {
          return res.status(200).send({
              message: 'congratulations! there is no hidden content', name: user.name,
          });
      }
      return res.status(200).send({
          message: 'congratulations! but there is a hidden content', name: user.name,
      });
    } catch (error) {
      return res.status(401).send({message: 'invalid jwt token'});
    }
  },
}