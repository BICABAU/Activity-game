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

FinishedMission.prototype.create = () => {
}

FinishedMission.prototype.search = (id_mission) => {
}

FinishedMission.prototype.delete = (id_mission) => {
}

FinishedMission.prototype.missionValidade = (id_user, id_mission, id_activity) => {
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
}

module.exports = FinishedMission;