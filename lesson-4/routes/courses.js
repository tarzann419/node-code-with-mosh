const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, title: 'course1'},
    { id: 2, title: 'course2'},
    { id: 3, title: 'course3'},
];

router.get('/', (req,res) => {
    res.send(courses);
})

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('course wasnt found or doesnt exist');
    } else {
        res.send(course);
    }
});

// create course

router.post('/', (req,res) => {
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
router.put('/api/courses/:id', (req,res) => {
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


router.delete('/:id', (req,res) => {
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


module.exports = router;