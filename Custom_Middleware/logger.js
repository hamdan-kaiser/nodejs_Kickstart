function log_data(req,res,next)
{
    console.log('Logging from another class...')
    next()
}

module.exports = log_data

