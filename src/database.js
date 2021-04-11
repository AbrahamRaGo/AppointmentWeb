//Es para tener una conexión a base de datos y este archivo será utilizado por index.js
const mongoose = require("mongoose"); //se guarda el modulo mongoose en la constante.
mongoose.connect("mongodb://localhost/appointment-db",{
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
}) //este método permite conectarse a una dirección de internet, en este caso nuestro localhost.
    .then(db =>console.log("DB esta conectada")) //si se conecta se muestra este mensaje por consola.
    .catch(err => console.error("Error")); //si no se conecta se muestra este mensaje de error por consola.