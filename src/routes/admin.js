const express = require("express");
const router = express.Router();

const Service = require("../models/Service");
const Appointment = require("../models/Appointment");

// Rutas para servicios (Mostrar, editar y eliminar desde BD)
router.get("/admin/createService", (req, res) => {
  res.render("admin/createService", { layout: "admin" });
});

router.get("/admin/services", async (req, res) => {
  const services = await Service.find();
  res.render("admin/services", { services, layout: "admin" });
});

router.post("/admin/createService", async (req, res) => {
  const { service, cost, description } = req.body;
  const errors = [];
  if (!service) {
    errors.push({text: "Por favor inserta un nombre"});
  }
  if (!cost) {
    errors.push({text: "Por favor inserta un costo"});  
  } 
  if(errors.length > 0){
    res.render("admin/createService", {errors, service, cost, description, layout: "admin"});
  }
  else {
    const newService = new Service({ service, cost, description });
    await newService.save();
    req.flash("success_msg", "Servicio agregado correctamente");
    res.redirect("/admin/services");
  }
});

router.get("/admin/update/:id", async (req, res) => {
  const service = await Service.findById(req.params.id);
  res.render("admin/updateService", { service, layout: "admin" });
});

router.put("/admin/updateService/:id", async (req, res) => {
  const { service, cost, description } = req.body;
  if (!service || !cost) {
    req.flash("error", "Nombre y costo no deben quedar vacios")
    res.redirect(`/admin/update/${req.params.id}`)
  }
  else {
    await Service.findByIdAndUpdate(req.params.id, {
      service,
      cost,
      description,
    });
    req.flash("success_msg", "Servicio actualizado correctamente");
    res.redirect("/admin/services");
  }
});

router.get("/admin/delete/:id", async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Servicio eliminado correctamente");
  res.redirect("/admin/services");
});

router.get("/admin/deleteApp/:id", async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Cita eliminada correctamente");
  res.redirect("../../admin/calendar");
});

// Ruta para citas, (Unicamente mostrar)
router.get("/admin/calendar", async (req, res) => {
  const appointments = await Appointment.find();
  res.render("admin/calendar", { appointments, layout: "admin" });
});

// Ruta para filtrado
router.post("/admin/search", async (req, res) => {
  const {search} = req.body;
  if (!search) {
    const services = await Service.find();
    res.render("admin/services", { services, layout: "admin" });
  } else {
    const services = await Service.find({service: search});
    res.render("admin/services", { services, layout: "admin" });
  }
})

module.exports = router;
