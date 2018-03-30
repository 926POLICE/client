var express = require('express')
var router = express.Router()

export default (logger, settings) => {
    router.get('/getServiceToken', (req, res) => {
        res.json({ token: settings.googleService.getToken() })
    })

    return router;
}
