const pool = require("../config/db")

let Mission = function (name, description, rewards, id_activity) {
  this.name = name;
  this.description = description;
  this.rewards = rewards;
  this.id_activity = id_activity;
}

Mission.prototype.listAll = function () {
  const consulta = "select missions.name, rewards_points, is_complementary_activity, is_extension_activity, is_atpas_activity from missions join activities on (missions.id_activities = activities.id_activities)" +
    "join activity_types on(activities.id_type = activity_types.id_activity_types)"

  return new Promise((resolve, reject) => {
    pool.query(consulta, (error, results) => {
      if (error) {
        reject("Não foi trazer as missões" + error)
      } else {
        missões_recuperadas = results.rows
        console.log(missões_recuperadas)
        resolve(missões_recuperadas)
      }
    })
  })
}

Mission.prototype.listAllPerActivityType = function () {

}

Mission.prototype.search = function (id_mission) {

}

Mission.prototype.create = function () {

}

Mission.prototype.delete = function (id_mission) {

}

Mission.prototype.missionValidate = function (id_user, id_certification) {
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
  const select = 'SELECT mi.id AS id_mission, mi.name AS name_mission, mi.rewards_points, act.quantity, act.hours_per_instance, us.id_user AS id_user' +
    ' FROM missions AS mi' +
    ' JOIN activities AS act ON mi.id_activities = act.id_activities' +
    ' JOIN certifications AS cert ON act.id_activities = cert.id_activity' +
    ' JOIN users AS us ON cert.id_user_fk = us.id_user' +
    ` WHERE cert.id_certification = ${id_certification} AND us.id_user = ${id_user}`

  return new Promise((resolve, reject) => {
    pool.query(select, [], (error, results) => {
      if (error) {
        reject(error)
      } else {
        resolve(results.rows[0])
      }
    })
  })
}

module.exports = Mission;