module.exports = (mongoose, Schema) => {
    const UserSchema = new Schema({
        display_name: String,
        username: String,
        password: String
    })

    UserSchema.methods.toJSON = function() {
        return {
            _id: this._id,
            display_name: this.display_name,
            username: this.username,
            password: this.password
        }
    }

    return mongoose.model('User', UserSchema)
}