module.exports = (server) => {
    const message = require('../Controller/message')
    const user = require('../Controller/user')
    const generic = require('../Controller/generic')

    /*
    * messages */
    server.get('/:node', generic.readAll)
    server.get('/:node/:_id', generic.read)

    server.post('/:node', generic.create)

    server.put('/:node/:_id', generic.update)

    server.del('/:node/:_id', generic.delete)

    /*
    * user */
    // server.get('/user', user.readAll)

    server.post('/create_account', user.create)
    server.post('/login', user.login)
    server.post('/logout', user.logout)
}