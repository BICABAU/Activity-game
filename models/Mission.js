const pool = require("../config/db")

let Mission = ({ name, description, rewards, id_activity }) => {
  this.name = name;
  this.description = description;
  this.rewards = rewards;
  this.id_activity = id_activity;
}

Mission.prototype.listAll = () => {

}

Mission.prototype.listAllPerActivityType = () => {

}

Mission.prototype.search = (id_mission) => {

}

Mission.prototype.create = () => {

}

Mission.prototype.delete = (id_mission) => {

}

Mission.prototype.missionValidate = (id_user, id_certification) => {
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
        resolve(results.rows[0])
      }
    })
  })
}

module.exports = Mission;