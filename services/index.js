require('module-alias/register');
const http = require('http'),
      secAPI = require('@secAPI'), //sec: salud en casa
      secServer = http.Server(secAPI),
      secPORT = process.env.PORT || 3001,
      LOCAL = '0.0.0.0';

secServer.listen(secPORT, LOCAL, () => console.log(`Magic happening on PORT # ${secPORT}`));