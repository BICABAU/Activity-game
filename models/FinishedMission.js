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
    ` VALUES (${new Date()}, ${id_mission}, ${id_user})` +
    ' RETURNING *';

  return new Promise((resolve, reject) => {
    pool.query(insert, [], (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results)
      }
    })
  })

}

FinishedMission.prototype.search = (id_mission) => {
}

FinishedMission.prototype.delete = (id_mission) => {
}

module.exports = FinishedMission;