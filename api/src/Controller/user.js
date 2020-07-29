const { User } = require('../Model')
const { UserSession } = require('../Model')
const bcrypt = require('bcrypt')

class UserController {
    async create(req, res, next) {
        const params = { ...req.body }
        const { password } = params
        
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        params.password = hash

        await User.create(params)

        res.send(200, params)
        return next()
    }

    async getContacts(req, res, next) {

    }

    async getContact(req, res, next) {

    }

    async update(req, res, next) {

    }

    async login(req, res, next) {

    }

    async logout(req, res, next) {
        
    }
}

module.exports = new UserController()