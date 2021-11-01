/**
 * EU quero salvar um novo certificado e automaticamente fazer o usuario concluir a missão
 *
 * [0] - Salvar o caminho do arquivo com UPLOADED-CERTIFICATION
 * [0] - Salvar dados do certificado em CERTIFICATION
 *  [0] - Buscar usuário
 *  [] - Validar atividade
 * [0] - Buscar uma missão equivalente a atividade do certificado - MISSION
 * [0] - Salvar essa missão em FINISHED-MISSION
 * [0] - Contabilizar os pontos em USER
 */

const User = require('../models/User');
const UploadedCertification = require('../models/UploadedCertification');
const Certification = require('../models/Certification');
const Mission = require('../models/Mission');
const FinishedMission = require('../models/FinishedMission');

exports.uploadCertification = function (req, res) {
  const {
    certification_name,
    description,
    activity_start,
    activity_end,
    amount_hours,
    id_activity
  } = req.body;

  const {
    originalname: file_name,
    fieldname: key_name,
    size,
    location: url,
  } = req.file; // SO PRA TENSTAR VOU BOTAR BODY MAS É FILE

  // console.log('key-name ->' + )
  const user = new User(req.session.user)
  const mission = new Mission()
  const finishedMission = new FinishedMission()

  const uploadedCertification = new UploadedCertification(key_name, size, url, file_name)

  return res.json({
    body: {
      certification_name,
      description,
      activity_start,
      activity_end,
      amount_hours,
      id_activity
    }, file: { file_name, key_name, size, url }
  })
  uploadedCertification.create()
    .then(file_uploaded => {
      console.log(file_uploaded)

      const searched_user = user.readByEmail(req.body.email) // PRA TESTAR VOU TIRAR O 'req.session.user.email'
        .then(result => {
          if (!searched_user) {
            return new Error('User doesnt found')
          }

          console.log(result)

          return result
        })
        .catch(err => console.log(err))

      const certification = new Certification(certification_name, description, activity_start, activity_end, amount_hours, id_activity, file_uploaded.id,)
      certification.create()
        .then(certification_created => {

          mission.missionValidate(searched_user.id, certification_created.id)
            .then((mission_validated) => {
              console.log(mission_validated)

              finishedMission.create(mission_validated.id, searched_user.id)
                .then((finished_mission_created) => {
                  user.countAmountPoints(searched_user.points_total_amount, mission_validated.rewards, searched_user.id)
                    .then(
                      res.send("redireciona o usuario para a pagina principal")
                    )
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        }
        )
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}