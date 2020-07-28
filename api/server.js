const restify = require('restify')
const routes = require('./src/Route')
const mongoose = require('mongoose')

/*
* Connection Parameters  */
const PORT = 6969
const DB = 'mongodb://localhost/mockchat'
const DB_OPTIONS = {
    useNewUrlParser: true
}
const DB_CALLBACK = (err) => {
    if(!err)
        console.log('DB SUCCESS!!!')
}

/*
* Database Connection */
mongoose.connect(DB, DB_OPTIONS, DB_CALLBACK)
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error: '))

/*
* Initialize models */
require('./src/Model')(mongoose)

/*
* Restify Server */
const server = restify.createServer()

routes(server)

server.listen(PORT, () => {
    console.log('%s listening at %s', server.name, server.url)
})


/*
* Graceful termination */
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Process terminated.')
        mongoose.connection.close()
        process.exit(0)
    })
})