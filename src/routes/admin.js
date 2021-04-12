
const express = require("express");
const router = express.Router();

const Service = require('../models/Service')

router.get('/admin/createService', (req, res) =>{
    res.render('admin/createService', {layout: 'admin'});
});

router.get('/admin/services', (req, res) =>{
    res.render('admin/services', {layout: 'admin'});
});

router.get('/admin/calendar', (req, res) =>{
    res.render('admin/calendar', {layout: 'admin'});
});

router.post('/admin/createService', async (req, res) =>{
    const {service, cost, description} = req.body;

        const newService = new Service({ service, cost, description });
        await newService.save();
        res.redirect('/admin/services')
    
})
module.exports = router;