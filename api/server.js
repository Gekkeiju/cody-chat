const restify = require('restify')
const mongoose = require('mongoose')
const corsMiddleware = require('restify-cors-middleware')

const routes = require('./src/Route')

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

/*
* Connection Parameters  */
const PORT = process.env.PORT || 7000
const DB = 'mongodb+srv://cluster0.ijrt4.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority'
const DB_OPTIONS = {
    dbName: process.env.DB_NAME || 'mockchat',
    user: process.env.DB_USER || 'juan-dummy',
    pass: process.env.DB_PASS || 'CkODfcLFfNWgH1xz',
    useNewUrlParser: true,
    useFindAndModify: false
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
* Restify Server */
const server = restify.createServer()
const cors = corsMiddleware({
    origins: ['*'],
    allowHeaders: ['*'],
    exposeHeaders: ['*']
})

server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.bodyParser({
    mapParams: true
}))
server.use(restify.plugins.queryParser({
    mapParams: false
}))
server.use((req, res, next) => {
    if(req.params.node)
        req.params.node = req.params.node.capitalizeFirstLetter()

    return next()
})

/*
* routes */
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