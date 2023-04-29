const responseHandler = (res, data) => {
    res.send({ data, status: true, message: 'success' })
}

module.exports = { responseHandler }