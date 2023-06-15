const Joi = require('@hapi/joi')

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required(),
  gender: Joi.string().required(),
  role: Joi.string().required()
})

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(8).required()
})

module.exports = {
  registerSchema, 
  loginSchema
}

docker run --name mysql -e MYSQL_ROOT_PASSWORD=@Ugm428660 -p 3306:3306 -v $HOME/mysql-data:/var/lib/mysql -d mysql:8.0

docker run --name mysql -e MYSQL_ROOT_PASSWORD=@Ugm428660 -v $HOME/mysql-data:/var/lib/mysql -d mysql:8.0