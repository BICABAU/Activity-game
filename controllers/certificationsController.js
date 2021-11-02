/**
 * EU quero salvar um novo certificado e automaticamente fazer o usuario concluir a missão
 *
 * [X] - Salvar o caminho do arquivo com UPLOADED-CERTIFICATION
 * [0] - Salvar dados do certificado em CERTIFICATION
 *  [0] - Buscar usuário
 *  [0] - Validar atividade
 * [0] - Buscar uma missão equivalente a atividade do certificado - MISSION
 * [0] - Salvar essa missão em FINISHED-MISSION
 * [0] - Contabilizar os pontos em USER
 */

const UploadedCertification = require('../models/UploadedCertification');
const Activity = require('../models/Activity');
const User = require('../models/User');
const Certification = require('../models/Certification');
const Mission = require('../models/Mission');
const FinishedMission = require('../models/FinishedMission');

exports.uploadCertification = function (req, res) {
  const {
    description,
    activity_start,
    activity_end,
    amount_hours,
    subcategoria_atividade: id_activity_type
  } = req.body;

  const {
    originalname: file_name,
    key: key_name,
    size,
  } = req.file;

  // Se o arquivo estiver sendo armazenado na AWS, retorna "location"
  // Se for no servidor local, retorna "path"
  const url = (req.file.location) ? req.file.location : req.file.path

  const activity = new Activity();
  const user = new User(req.session.user)
  const mission = new Mission()
  const finishedMission = new FinishedMission()

  const uploadedCertification = new UploadedCertification(key_name, size, url, file_name)

  // return res.json({
  //   body: {
  //     certification_name,
  //     description,
  //     activity_start,
  //     activity_end,
  //     amount_hours,
  //     id_activity
  //   },
  //   file: { file_name, key_name, size, url },
  //   requisition: {
  //     req_body: req.body,
  //     req_file: req.file,
  //     req_session: req.session
  //   }
  // })

  uploadedCertification.create()
    .then(file_uploaded => {
      activity.searchOne(id_activity_type)
        .then(searchedActivity => {
          user.readByEmail(req.session.user.email)
            .then(searched_user => {
              if (!searched_user) {
                return new Error('User doesnt found')
              }

              const certification = new Certification(file_uploaded.name, description, activity_start, activity_end, amount_hours, searchedActivity.id, file_uploaded.id, searched_user.id_user)
              certification.create()
                .then(certification_created => {

                  mission.missionValidate(searched_user.id_user, certification_created.id_certification)
                    .then((mission_validated) => {
                      console.log(mission_validated)

                      finishedMission.create(mission_validated.id, searched_user.id_user)
                        .then((finished_mission_created) => {
                          user.countAmountPoints(searched_user.points_total_amount, mission_validated.rewards, searched_user.id_user)
                            .then(
                              res.send("redireciona o usuario para a pagina principal")
                            )
                        })
                        .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}