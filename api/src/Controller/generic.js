const Model = require('../Model')

class GenericController {
    async create(req, res, next) {
        const { node } = req.params
        const params = req.body

        const element = await Model[node].create(params)

        res.send(200, element)
        return next()
    }

    async readAll(req, res, next) {
        const { node } = req.params
        const elements = await Model[node].find()

        res.send(elements)
        return next()
    }

    async read(req,res, next) {
        const { node, _id } = req.params

        const element = await Model[node].findOne({ _id })

        res.send(200, element)
        return next()
    }

    async update(req, res, next) {
        const { node, _id } = req.params
        const params = req.body

        const element = await Model[node].findOneAndUpdate(
            { _id },
            params,
            {
                new: true
            }
        )

        res.send(200, element)
        return next()
    }

    async delete(req, res, next) {
        const { node, _id } = req.params
        
        await Model[node].deleteOne({ _id })

        res.send(200, { deleted: true })
        return next()
    }
}

module.exports = new GenericController()