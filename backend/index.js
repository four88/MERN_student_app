let express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    dbConfig = require('./database/db'),
    path = require('path');


//  Express Route
const studentRoute = require('../backend/routes/student.route');

//  Connecting MongoDB Database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser : true
}).then(() => {
    console.log('Database successfully connected');
},
    error => {
        console.log('Could not connect to database:' + error)
    }
)


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors());
app.use('/students', studentRoute)

// for deploy with heroku
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../build')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "../build/index.html"))
    })
}

//  PORT
const port = process.env.PORT || 4200;
const server = app.listen(port, () => {
    console.log('connected to port' + port)
})

//  404 error
app.use((req, res, next) => {
    next(createError(404))
})

// Error handler
app.use(function(err, req, res ,next){
    console.log(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.statuse(err.statusCode).send(err.message);
})