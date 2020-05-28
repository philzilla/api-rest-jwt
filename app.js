const express = require('express')
    , mongoose = require('mongoose')
    , app = express()
    , port = 3050
    , verifyToken = require('./routes/verifyToken')

// Mongoose
mongoose.connect('mongodb://localhost:27017/monblog', {useNewUrlParser: true, useUnifiedTopology: true })
console.log("Status Mongoose :", mongoose.connection.readyState);

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))


// Route
const { getHomePage } = require('./routes/index')
const authRoute = require('./routes/auth')
const usersRoute = require('./routes/users')
const articlesRoute = require('./routes/articles')
const categoriesRoute = require('./routes/categories')


// API
app.use('/api/users', usersRoute)
app.use('/api/articles', articlesRoute)
app.use('/api/categories', categoriesRoute)
app.use('/api/auth', authRoute)
app.get('/', verifyToken, getHomePage)

app.listen(port, () => console.log(`Le serveur tourne sur le port : ${port}`))