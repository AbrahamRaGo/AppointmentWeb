const express = require("express");
const router = express.Router();

router.get('/client/agenda', (req, res)=>{
    res.render('client/agenda', {layout: 'client'});
}); //ruta para visitar la pagina inicial me devuelve el mensaje "index" o especificado cuando es send si es render envia a un archivo.

module.exports = router;