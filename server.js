const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const port = '8000';

app.use(cors());
app.use(morgan('dev'));

app.get('/', (req,res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`listening to http://localhost/${port}`)
})

