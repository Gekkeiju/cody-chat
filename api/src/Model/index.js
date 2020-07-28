module.exports = (mongoose) => {
    const { Schema } = mongoose
    const fs = require('fs')

    //get files with schema values
    let files = fs.readdirSync(__dirname, (err, files) => {
        if(err) {
            return console.log('Unable to scan directory: ' + err);
        }

        return files
    })

    //remove self from array
    files = files.filter(f => f !== 'index.js')

    //create models
    files.map(f => {
        const model = f.replace('.js', '')
        const data = require(`./${model}`)
        const schema = new Schema(data)

        mongoose.model(model, schema)
    })
}