
const express = require("express");
const router = express.Router();

const Service = require('../models/Service')

router.get('/admin/createService', (req, res) =>{
    res.render('admin/createService');
});

router.get('/admin/services', (req, res) =>{
    res.render('admin/services');
});

router.get('/admin/calendar', (req, res) =>{
    res.render('admin/calendar');
});

router.post('/admin/createService', async (req, res) =>{
    const {name, cost, description} = req.body;
    if (name && cost && description) {
        const newService = new Service({ name, cost, description });
        await newService.save();
        res.redirect('admin/services')
    } else {
        res.send('Error')
    }
    
})
module.exports = router;