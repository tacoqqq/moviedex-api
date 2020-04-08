require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const data = require('./moviedata.json');

const app = express();
const port = '8000';

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

// To validate
function validateBearerToken(req,res,next){
    const api_token = process.env.API_TOKEN;
    const bearer_token = req.get('Authorization').split(' ')[1];

    if (!bearer_token || bearer_token !== api_token){
        res.status(400).json({error: 'Unauthorized request!'})
    }

    next();
}

app.use(validateBearerToken)


// To handle request
function handleRequest(req,res){
    const genre = req.query.genre;
    const country = req.query.country;
    const avg_vote = req.query.avg_vote;
    let response = data;

    if (genre) {
        response = response.filter(movie => movie.genre.toLowerCase().includes(genre.toLowerCase()))
    }

    if (country) {
        response = response.filter(movie => movie.country.toLowerCase().includes(country.toLowerCase()))
    }

    if (avg_vote) {
        response = response.filter(movie => movie['avg_vote'] >= Number(avg_vote))
    }

    response.length > 0 ? res.json(response) : res.send('Uh oh...no matching movie :(')
}

app.get('/movie', handleRequest)


// To listen to port
app.listen(port, () => {
    console.log(`listening to http://localhost/${port}`)
})

