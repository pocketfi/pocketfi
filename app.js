const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');

const registerRoutes = require('./routes/api/register');
const connectionString = config.ATLAS_URI;

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

mongoose
    .connect(connectionString, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

app.use('/api/register', registerRoutes);

module.exports = app;
