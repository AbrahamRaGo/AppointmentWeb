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
    console.log(req.body)
    const {nameClient, mailClient, date, time, service} = req.body;
    const errors = []
    if (!nameClient) {
        errors.push({text: "Debe ingresar su nombre"})
    }
    if (!mailClient) {
        errors.push({text: "Debe ingresar su correo"})
    }
    if (!date) {
        errors.push({text: "Debe ingresar una fecha"})
    }
    if (!time != "Seleccionar") {
        errors.push({text: "Debe ingresar una hora"})
    }
    if (service != "Seleccionar") {
        errors.push({text: "Debe seleccionar un servicio"})
    }
    if (errors.length > 0) {
        res.render("client/createAppointment", {errors, layout: "main"})
    }
    else{
        const newAppointment = new Appointment({ nameClient, mailClient, service, date, time });
        await newAppointment.save();
        req.flash("success_msg", "Cita creada correctamente");
        res.redirect("/client/createAppointment");
    }
})

module.exports = router;