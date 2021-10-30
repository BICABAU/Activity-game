const FinishedMission = require('../models/FinishedMission');

exports.missionValidade = function (req, res) {
  let missionExists = new FinishedMission(req.body)
  missionExists
    .missionValidade()
    .then((result) => {
      console.log(result)
    })
    .catch((err) => {
      res.send('err: ' + err)
    })
};