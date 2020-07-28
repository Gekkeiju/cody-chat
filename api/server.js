const restify = require('restify')
const mongoose = require('mongoose')
const {Schema} = mongoose
const routes = require('./src/Route')

const server = restify.createServer()
routes(server)

const PORT = 6969
const DB = 'mongodb://localhost/mockchat'
const DB_OPTIONS = {
    useNewUrlParser: true
}
const DB_CALLBACK = (err) => {
    if(!err)
        console.log('DB SUCCESS!!!')
}

mongoose.connect(DB, DB_OPTIONS, DB_CALLBACK)
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error: '))

const {Message, User} = require('./src/Model')(mongoose, Schema)

server.listen(6969, () => {
    console.log('%s listening at %s', server.name, server.url)
})

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Process terminated.')
        mongoose.connection.close()
        process.exit(0)
    })
})