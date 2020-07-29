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
        
        const user = await User.create(params)
            .catch(error => {
                res.send(400, { message: "username exists"})
                return error
            })

        if(user._id)
            res.send(200, user)

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
        
        const pass = bcrypt.compareSync(password, user.password)

        if(!pass)
            res.send(400, { error: "Incorrect Username or Password" })

        if(user && pass) {
            const { _id: session_id } =
                await UserSession.create({
                    user_id: user._id,
                    active: true
                })

            res.send(200, { session_id })
        }

        return next()
    }

    async logout(req, res, next) {
        const { session_id: _id } = req.body

        const session = await UserSession.findOneAndUpdate(
            {
                _id
            },
            {
                active: false
            },
            {
                new: true
            }
        )

        if(session && !session.active)
            res.send(200, { logged_out: !session.active })
        else
            res.send(500, { error: 'error'})
            
        return next()
    }
}

module.exports = new UserController()