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
  if (!service || !cost) {
    req.flash("error_msg", "Los campos nombre y costo no deben estar vacíos");
    res.redirect("/admin/createService");
  } else {
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
    req.flash("error_msg", "Los campos nombre y costo no deben estar vacíos");
    res.redirect(`/admin/update/${req.params.id}`);
  } else {
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

// Ruta para citas, (Unicamente mostrar)
router.get("/admin/calendar", async (req, res) => {
  const appointments = await Appointment.find();
  res.render("admin/calendar", { appointments, layout: "admin" });
});

module.exports = router;
