
const express = require("express");
const router = express.Router();

router.get('/admin/createService', (req, res) =>{
    res.render('admin/createService', {layout: 'admin'});
});

router.get('/admin/services', (req, res) =>{
    res.render('admin/services', {layout: 'admin'});
});

router.get('/admin/calendar', (req, res) =>{
    res.render('admin/calendar', {layout: 'admin'});
});

router.post('/admin/createService', (req, res) =>{
    console.log(req.body);
    res.send('ok')
})
module.exports = router;