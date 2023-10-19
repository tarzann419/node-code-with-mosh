const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    // res.send('Hello world')
    res.render('home', { var_1, var_2 })
})


module.exports = router;