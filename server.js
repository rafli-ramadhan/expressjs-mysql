const express = require('express')
const app = express()
require('dotenv').config()

// cors
const cors = require('cors');
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const bodyParser = require("body-parser");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// route
require("./Routes")(app);

// mysql connection synchronously
require("./Models").sequelize.sync({ alter: true}).then(() => {
  console.log("Connected to database")
})

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
