module.exports = (mongoose, Schema) => {
    return {
        Message: require('./Message')(mongoose, Schema),
        User: require('./User')(mongoose, Schema)
    }
}