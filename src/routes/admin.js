const express = require("express");
const router = express.Router();

router.get('/admin/createService', (req, res) =>{
    res.render('admin/createService');
});

router.get('/admin/services', (req, res) =>{
    res.render('admin/services');
});

module.exports = router;