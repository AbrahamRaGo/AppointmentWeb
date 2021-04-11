const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.render("index");
}); //ruta para visitar la pagina inicial me devuelve el mensaje "index" o especificado cuando es send si es render envia a un archivo.
router.get("/about", (req, res)=>{
    res.render("about");
}); //ruta para visitar la pagina about.

module.exports = router;