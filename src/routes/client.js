const express = require("express");
const router = express.Router();

const Service = require("../models/Service");
const Appointment = require("../models/Appointment");

router.get('/client/agenda', async (req, res)=>{
    const services = await Service.find()
    res.render('client/agenda', {services, layout: 'client'});
}); //ruta para visitar la pagina inicial me devuelve el mensaje "index" o especificado cuando es send si es render envia a un archivo.

module.exports = router;