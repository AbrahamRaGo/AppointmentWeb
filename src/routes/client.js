const express = require("express");
const router = express.Router();

const Service = require("../models/Service");
const Appointment = require("../models/Appointment");

router.get('/client/createAppointment', async (req, res)=>{
    const services = await Service.find()
    const appointments = await Appointment.find()
    res.render('client/createAppointment', {services, appointments, layout: 'client'});
}); //ruta para visitar la pagina inicial me devuelve el mensaje "index" o especificado cuando es send si es render envia a un archivo.

router.post('/client/createAppointment', async (req, res) => {
    const {nameClient, emailClient, date, time, service} = req.body;
    const errors = []
    if (!nameClient || !emailClient || !date || time == "Seleccionar" || service == "Seleccionar") {
        req.flash("error", "No debe dejar ningún campo vacío")
        res.redirect("/client/createAppointment")
    }
    else{
        const newAppointment = new Appointment({ nameClient, emailClient, service, date, time });
        console.log(newAppointment)
        await newAppointment.save();
        req.flash("success_msg", "Cita creada correctamente");
        res.redirect("/client/createAppointment");
    }
})

module.exports = router;