const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const Joi = require('joi');
app.use(express.json()); // returns a middleware


const courses = [
    { id: 1, title: 'course1'},
    { id: 2, title: 'course2'},
    { id: 3, title: 'course3'},
];

app.get('/', (req, res) => {
    res.send('Hello world')
})

// app.get('/api/courses', (req, res) => {
//     res.send([1, 2, 3, 4])
// })

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('course wasnt found or doesnt exist');
    } else {
        res.send(course);
    }
});

// create course

app.post('/api/courses', (req,res) => {
    const { error } = validateCourse(req.body) // object destructuring
    if (error) {
        return res.status(400).send(error.details[0].message)
    } 
    const course = {
        id : courses.length + 1,
        body : req.body.name,
    };
    courses.push(course); 
    res.send(course);
});
// end create course //


// update course
app.put('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('course wasnt found or doesnt exist');
    }

    const { error } = validateCourse(req.body) // object destructuring
    if (error) {
        return res.status(400).send(error.details[0].message)
    } 

    course.name = req.body.name
    res.send(course);
});


app.delete('/api/courses/:id', (req,res) => {
    // find by id
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        return res.status(404).send('course wasnt found or doesnt exist');
    }

    // delete by using 'splice'
    const index = courses.indexOf(course);
    courses.splice(index);

    // return the deleted object
    res.send(index);
})


function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required(),
    }

    return Joi.validate(course, schema);
}

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});