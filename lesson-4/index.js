const express = require('express');
const app = express();
const PORT = process.env.PORT;

const courses = [
    { id: 1, title: 'course1'},
    { id: 2, title: 'course2'},
    { id: 3, title: 'course3'},
];

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3, 4])
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('course wasnt found or doesnt exist');
    } else {
        res.send(course);
    }
})


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});