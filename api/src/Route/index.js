const controller = require('../Controller/index')

module.exports = (server) => {
    server.get('/hello/:name', controller.respond)
    server.head('/hello/:name', controller.respond)
    
}