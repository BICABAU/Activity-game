const pool = require("../config/db")

let FinishedMission = function (date_end, id_mission, id_user) {
  this.date_end = date_end;
  this.id_mission = id_mission;
  this.id_user = id_user;
}

FinishedMission.prototype.listAll = function () {
  /**
   * Listar todas missoes feitas pelo id do usuario
   */
}

FinishedMission.prototype.listAllPerActivityType = function () {
  /**
   * Listar pelo id do usuario e pelo tipo de atividade
   */
}

FinishedMission.prototype.create = function (id_mission, id_user) {
  const insert = 'INSERT INTO finished_missions' +
    ' (date_end, id_user, id_mission)' +
  ' VALUES ($1, $2, $3)' +
    ' RETURNING *';

  const date_end = new Date()
  const values = [date_end,id_user, id_mission]

  return new Promise((resolve, reject) => {
    pool.query(insert, values, (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results.rows[0])
      }
    })
  })

}

FinishedMission.prototype.search = function (id_mission) {
}

FinishedMission.prototype.delete = function (id_mission) {
}

module.exports = FinishedMission;