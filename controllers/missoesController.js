const Mission = require('../models/Mission');

exports.missoes = function (req, res) {
    let mission = new Mission()
    mission.listAll().then((results) => {
        res.render('pages/missoes', { missoes: results })
    })
        .catch((err) => {
            res.send(err)
        })
}