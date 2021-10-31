/**
 * EU quero salvar um novo certificado e automaticamente fazer o usuario concluir a missão
 *
 * [] - Salvar o caminho do arquivo com UPLOADED-CERTIFICATION
 * [] - Salvar dados do certificado em CERTIFICATION
 *  [] - Buscar usuário
 *  [] - Validar atividade
 * [] - Buscar uma missão equivalente a atividade do certificado - MISSION
 * [] - Salvar essa missão em FINISHED-MISSION
 * [] - Contabilizar os pontos em USER
 */

const User = require('../models/User');
const UploadedCertification = require('../models/UploadedCertification');
const Certification = require('../models/Certification');
const Mission = require('../models/Mission');
const FinishedMission = require('../models/FinishedMission');

exports.uploadCertification = function (req, res) {
  const {
    name: certification_name,
    description,
    activity_start,
    activity_end,
    amount_hours,
    id_activity
  } = req.body;

  const {
    name: file_name,
    key_name,
    size,
    url,
  } = req.file;

  const user = new User()
  const mission = new Mission()
  const finishedMission = new FinishedMission()

  const uploadedCertification = new UploadedCertification(file_name, key_name, size, url)
  uploadedCertification.create()
    .then(file_uploaded => {
      console.log(file_uploaded)

      const certification = new Certification(certification_name, description, activity_start, activity_end, amount_hours, id_activity, file_uploaded,)
      certification.create()
        .then(certification_created => {
          const searched_user = user.readByEmail(req.session.user.email)
            .then(result => {
              console.log(result)

              return result
            })
            .catch(err => console.log(err))

          mission.missionValidate(searched_user.id, certification_created.id)
            .then((mission_validated) => {
              console.log(result)

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
    })
    .catch(err => console.log(err))

  // certification.create()
  //   .then(certification_created => {
  //     const searched_user = user.readByEmail(req.session.user.email)
  //       .then(result => {
  //         console.log(result)

  //         return result
  //       })
  //       .catch(err => console.log("User doesnt found - " + err))

  //     mission.missionValidate(searched_user.id, certification_created.id)
  //       .then((mission_validated) => {
  //         console.log(result)

  //         finishedMission.create(mission_validated.id, searched_user.id)
  //           .then((finished_mission_created) => {
  //             user.countAmountPoints(searched_user.points_total_amount, mission_validated.rewards, searched_user.id)
  //               .then(
  //                 res.send("redireciona o usuario para a pagina principal")
  //               )
  //           })
  //           .catch(err => console.log(err))
  //       })
  //       .catch(err => console.log(err))
  //   }
  //   )
}