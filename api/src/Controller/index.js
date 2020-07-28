module.exports = {
    respond: 
        (req, res, next) =>{
            res.send('hello ' + req.params.name + '\n')
            next()
        }
}