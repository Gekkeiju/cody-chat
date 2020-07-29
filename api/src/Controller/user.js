const { User } = require('../Model')
const { UserSession } = require('../Model')
const bcrypt = require('bcrypt')

class UserController {
    async create(req, res, next) {
        const params = req.body
        const { password } = params
        
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        params.password = hash

        await User.create(params)

        res.send(200, params)
        return next()
    }

    // async getContacts(req, res, next) {

    // }

    // async getContact(req, res, next) {

    // }

    async login(req, res, next) {
        const { username, password } = req.body

        const user = await User.findOne({ username })

        if(!user)
            res.send(400, { error: "No user" })

        const pass = bcrypt.compareSync(password, user.hash)

        if(!pass)
            res.send(400, { error: "Incorrect Username or Password" })

        if(user && pass) {
            await UserSession.create({
                user_id,
                active: true
            })

            res.send(200, { session_id: "sess" })
        }
        
        return next()
    }

    async logout(req, res, next) {
        const { _id } = req.query

        UserSession.findOneAndUpdate(
            {
                _id
            },
            {
                active: false
            },
            {
                returnNewDocument: false
            }
        )

        res.send(200, { logged_out: true })
        return next()
    }
}

module.exports = new UserController()