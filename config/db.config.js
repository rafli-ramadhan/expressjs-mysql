module.exports = {
  HOST:"sql6.freesqldatabase.com",
	USER:"sql6467256",
	PASSWORD:"ZeaAuEqlQu",
	PORT: 3306,
	DB:"sql6467256",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
  /* ---local---

  HOST:"127.0.0.1",
  USER:"root",
  PASSWORD:"",
  POST:3306,
  DB:"",
  dialect:"mysql"
  */
};
