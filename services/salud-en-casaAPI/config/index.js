var url = "mongodb://jadope:123@ds135399.mlab.com:35399/salud-en-casa";

module.exports = {
    secret: 'salud-en-casa-secret-secretito', //JWT for the session
    session: { session: false }, //session
    database: url //mongo database url
  }