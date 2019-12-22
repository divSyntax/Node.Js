const express = require('express');
const moment = require('moment');

const app = express();

//Body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const logger = (req, res, next) => 
{
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
}

//app.use(logger);

//members API routes.
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running...`));