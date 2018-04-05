module.exports = (mongoose, config) => {
    const database = mongoose.connection;
    mongoose.Promise = Promise; //Si no se generaba esto, salían errores por consola.
  
    mongoose.connect(config.database, {
      useMongoClient: true,
      promiseLibrary: global.Promise
    });
  
    database.on('error', error => console.log(`La conexión a la base de datos falló: ${error}`));
    database.on('connected', () => console.log('Conectado exitosamente a la base de datos.'));
    database.on('disconnected', () => console.log('Se ha desconectado de la base de datos.'));
  
    process.on('SIGINT', () => {
      database.close(() => {
        console.log('salud-en-casa finalizado, se ha cerrado la conexión');
        process.exit(0);
      })
    });
  };