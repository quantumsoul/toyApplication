const express = require('express')
const bcrypt = require('bcrypt')
require('./db/mongoose')
const userRouter = require('../src/routers/user')
const toyRouter = require('../src/routers/toys')
const app = express()
const port = process.env.PORT
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json())
app.use(userRouter)
app.use(toyRouter)
app.listen(3000,()=>{
    console.log('Server is up on port ' + 3000)
})