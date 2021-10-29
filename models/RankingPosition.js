const pool = require("../config/db")

let RankingPosition = ({ position, id_user }) => {
  this.position = position;
  this.id_user = id_user;
}

RankingPosition.prototype.listAll = () => {
  /**
   * Tem que retornar um vetor em ordem decrescente a partir
   * do total de pontos do usuario
   * 
   * fazer um SELECT com JOIN em USER e colocar as devidas restrições
   */
}

RankingPosition.prototype.create = () => {
  /**
   * Tem que verificar todas as posições dos usuarios
   * e partir dos pontos totais, add o usuario na posição que ele merece
   * 
   * Essa função será chamada no momento da criação de um novo usuário, este que
   * logo de cara fica na última posição
   */
}

module.exports = RankingPosition;