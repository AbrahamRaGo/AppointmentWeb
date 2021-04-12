
const express = require("express");
const router = express.Router();

router.get('/admin/createService', (req, res) =>{
    res.render('admin/createService');
});

router.get('/admin/services', (req, res) =>{
    res.render('admin/services');
});

router.get('/admin/calendar', (req, res) =>{
    res.render('admin/calendar');
});

router.post('/admin/createService', (req, res) =>{
    console.log(req.body);
    res.send('ok')
})
module.exports = router;