const pool = require("../config/db")

let FinishedMission = ({ date_end, id_mission, id_user }) => {
  this.date_end = date_end;
  this.id_mission = id_mission;
  this.id_user = id_user;
}

FinishedMission.prototype.listAll = () => {
  /**
   * Listar todas missoes feitas pelo id do usuario
   */
}

FinishedMission.prototype.listAllPerActivityType = () => {
  /**
   * Listar pelo id do usuario e pelo tipo de atividade
   */
}

FinishedMission.prototype.create = async (id_mission, id_user) => {
  const insert = 'INSERT INTO finished_missions' +
    ` VALUES (${new Date()}, ${id_mission}, ${id_user})`

  const new_mission_finished = await new Promise((resolve, reject) => {
    pool.query(insert, [], (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })

  return new_mission_finished
}

FinishedMission.prototype.search = (id_mission) => {
}

FinishedMission.prototype.delete = (id_mission) => {
}

FinishedMission.prototype.missionValidade = ({ id_user, id_certification }) => {
  /**
   * Assim que o usuario:
   * -> Faz o upload do arquivo
   * -> Salva as informações do certificado
   * 
   * Ele precisa:
   * -> Buscar a missão equivalente a atividade concluída
   * -> Quando achar, criar instância na tabela FINISHED MISSION com a data_end
   * -> Atribuir pontos de recompensa ao USER
   */
  const select = 'SELECT mi.id AS id_mission, mi.name AS name_mission, mi.rewards_points, act.name AS name_activity, act.quantity, act.hours_per_instance, us.id AS id_user' +
    ' FROM missions AS mi' +
    ' JOIN activities AS act ON mi.id_activity = act.id' +
    ' JOIN certifications AS cert ON act.id = cert.id_activity' +
    ' JOIN users AS us ON cert.id_user = us.id' +
    ` WHERE cert.id = ${id_certification} AND us.id = ${id_user}`

  return new Promise((resolve, reject) => {
    pool.query(select, [], (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results.rows)
      }
    })
  })

}

module.exports = FinishedMission;