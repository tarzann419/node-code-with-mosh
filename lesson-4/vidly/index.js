const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const Joi = require('joi');

// use json
app.use(express.json());
const videos = [
    { id:1, title:'video1'},
    { id:2, title:'video2'},
    { id:3, title:'video3'},
]

// app.get('/api/vidly', (req,res) => {
//     res.send('helklo world')
// })

// read all videos
app.get('/api/vidly', (req,res) => {
    res.send(videos);
})
// end read all videos



// create video
app.post('/api/vidly', (req,res) => {
    const { error } = validateVideo(req.body);
    if (error) {
        return res.status(404).send(error.details[0].message);
    }
    const video = {
        id: videos.length + 1,
        title: req.body.title
    };
    // now push to the array
    videos.push(video);
    res.send(video);
});


// update video
app.put('/api/vidly/:id', (req,res) => {
    const video = videos.find( c => c.id  === parseInt(req.params.id));
    if (!video) {
        res.status(404).send('the video with the id youre looking for does not exist')
    }
    const { error } = validateVideo(req.body);
    if (error) {
        return res.status(404).send(error.details[0].message);
    }

    video.title = req.body.title;
    res.send(video);
});




// delete video
app.delete('/api/vidly/:id', (req,res) => {
    const video = videos.find( c => c.id  === parseInt(req.params.id));
    if (!video) {
        res.status(404).send('the video with the id youre looking for does not exist')
    }

    const index = videos.indexOf(video)
    videos.splice(index)

    // return the deleted video
    res.send(index);

});


function validateVideo(video){
    const schema = {
        title: Joi.string().min(5).required()
    }
    return Joi.validate(video, schema);
}
app.listen(port, () => {
    console.log(`app is listening on port: ${port}`)
})