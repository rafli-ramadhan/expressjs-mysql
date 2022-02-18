# express-mysql
Express.js Auth and CRUD App with MySQL Database

For instruction, please visit:
> [Build Node.js Rest APIs with Express & MySQL](https://bezkoder.com/node-js-rest-api-express-mysql/)

More Practice
> [Build Node.js Rest APIs with Express, Sequelize & MySQL](https://bezkoder.com/node-js-express-sequelize-mysql/)

> [Server side Pagination in Node.js with Sequelize and MySQL](https://bezkoder.com/node-js-sequelize-pagination-mysql/)

> [Deploying/Hosting Node.js app on Heroku with MySQL database](https://bezkoder.com/deploy-node-js-app-heroku-cleardb-mysql/)

Security:
> [Node.js Express: JWT example | Token Based Authentication & Authorization](https://bezkoder.com/node-js-jwt-authentication-mysql/)

Associations:
> [Sequelize Associations: One-to-Many Relationship example](https://bezkoder.com/sequelize-associate-one-to-many/)

> [Sequelize Associations: Many-to-Many Relationship example](https://bezkoder.com/sequelize-associate-many-to-many/)

Fullstack:
> [Vue.js + Node.js + Express + MySQL example](https://bezkoder.com/vue-js-node-js-express-mysql-crud-example/)

> [Vue.js + Node.js + Express + MongoDB example](https://bezkoder.com/vue-node-express-mongodb-mevn-crud/)

> [Angular 8 + Node.js + Express + MySQL example](https://bezkoder.com/angular-node-express-mysql/)

> [Angular 10 + Node.js + Express + MySQL example](https://bezkoder.com/angular-10-node-js-express-mysql/)

> [Angular 11 + Node.js Express + MySQL example](https://bezkoder.com/angular-11-node-js-express-mysql/)

> [React + Node.js + Express + MySQL example](https://bezkoder.com/react-node-express-mysql/)

## Project setup
```
npm install
```

### Run
```
node server.js
```

### Reference Documentation

1.) MySQL Connection with Sequilize : https://sequelize.org/master/manual/getting-started.html 

2.) MySQL Connect to existing table in existing database : 
in ./models/user.model.js write `const User = sequelize.define('user', {`, where user is the table in MySQL database.

3.) Model synchronization using Sync()

- sync() Method − Only create model if exists. If the model exists, it will not overwrite the model.

- sync({force: true}) Method − Will create a new model if the model does not exist, however, if the model exists, it will overwrite the existing model.

https://sequelize.org/v6/manual/model-basics.html

4.) Synchronizing all models at once : https://sequelize.org/v6/manual/model-basics.html#providing-the-table-name-directly

### Error Documentation

1.) SyntaxError: await is only valid in async functions and the top level bodies of modules

Solution : In server.js remove await and change to then and catch function 

2.) Error : TypeError: require(...).sync is not a function

Solution : In server.js change `require("./config/db.connect").sync();` to `require("./config/db.connect").sync;`

3.) Error : Access denied for user ''@'localhost' (using password: NO)

Solution : install dotenv, then and add `require('dotenv').config();` in server.js
https://stackoverflow.com/questions/46200729/er-access-denied-error-access-denied-for-user-localhost-using-password-n

Note : In node.js application, `require('dotenv').config();` line is needed in server.js file when developing locally in order to use environment variables.
https://stackoverflow.com/questions/60480863/requiredotenv-config-in-node-js

4.)  Error : listen EADDRINUSE: address already in use :::3306

Solution : Check file .env and remove `PORT = 3306` of MySQL and replace with `DB_PORT = 3306`. Replace `process.env.PORT` in /config/config.js file to `process.env.DB_PORT`

5.) Error : [SEQUELIZE0004] DeprecationWarning: A boolean value was passed to options.operatorsAliases. This is a no-op with v5 and should be removed.

Solution : For sequelize v6 change `operatorsAliases: false` in db.config.js to be `operatorsAliases: 0` (https://stackoverflow.com/questions/58593200/deprecationwarning-a-boolean-value-was-passed-to-options-operatorsaliases-this)

6.) TypeError: Cannot read properties of undefined (reading 'define')

Solution : https://stackoverflow.com/questions/58460033/sequelize-typeerror-cannot-read-property-define-of-undefined
