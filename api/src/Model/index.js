const fs = require('fs')
const mongoose = require('mongoose')
const { Schema } = mongoose

module.exports = (() => {
    //get files with schema values
    let files = fs.readdirSync(__dirname, (err, files) => {
        if(err) {
            return console.log('Unable to scan directory: ' + err);
        }

        return files
    })
    //remove self from array
    files = files.filter(f => f !== 'index.js')

    const Models = {}

    //create models
    files.map(f => {
        const model = f.replace('.js', '')
        const data = require(`./${model}`)
        const schema = new Schema(
            data,
            { 
                timestamps: { 
                    createdAt: 'created_at',
                    updatedAt: 'updated_at'
                }
            }
        )

        Models[model] = mongoose.model(model, schema)
    })

    return Models
})()