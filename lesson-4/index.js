const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const Joi = require('joi');
const logger = require('./middleware/logger');
const authenticating = require('./middleware/authenticatingMiddleware');

const courses = require('./routes/courses');
app.use('/api/courses', courses)

const home = require('./routes/home');
app.use('/api/home', home)

app.use(express.json()); // returns a middleware
app.use(express.urlencoded({ extended : true }));
app.use(express.static('public'));

// custom middleware
app.use(logger);
app.use(authenticating);
app.set('views', './views')
// third party middleware
const morgan = require('morgan');
// console.log(`${process.env.NODE_ENV}`)
// console.log(app.get('env'))

if (app.get('env') == 'development') {
    app.use(morgan('tiny'))
    console.log('Morgan enabled...')
}





// app.get('/api/courses', (req, res) => {
//     res.send([1, 2, 3, 4])
// })

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});