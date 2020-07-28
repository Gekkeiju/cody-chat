module.exports = (mongoose, Schema) => {
    const MessageSchema = new Schema({
        body: String,
        sender: String,
        receiver: String
    })

    MessageSchema.methods.toJSON = function() {
        return {
            _id: this._id,
            body: this.body,
            sender: this.sender,
            receiver: this.receiver
        }
    }

    return mongoose.model('Message', MessageSchema)
}