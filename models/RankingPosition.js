const pool = require("../config/db")

let RankingPosition = function (position, id_user) {
  this.position = position;
  this.id_user = id_user;
}

RankingPosition.prototype.listAll = function (id_course) {
  /**
   * Tem que retornar um vetor em ordem decrescente a partir
   * do total de pontos do usuario
   * 
   * fazer um SELECT com JOIN em USER e colocar as devidas restrições
   */
  const consulta = "select first_name, last_name, points_total_amount from users where id_course = $1 order by points_total_amount desc"
  const values = [id_course]
  return new Promise((resolve, reject) => {
    pool.query(consulta, values, (error, results) => {
      if (error) {
        reject("Não foi trazer as os usuarios para o ranking" + error)
      } else {
        pessoas_ranking = results.rows
        console.log(pessoas_ranking)
        resolve(pessoas_ranking)
      }
    })
  })
}

RankingPosition.prototype.create = function () {
  /**
   * Tem que verificar todas as posições dos usuarios
   * e partir dos pontos totais, add o usuario na posição que ele merece
   * 
   * Essa função será chamada no momento da criação de um novo usuário, este que
   * logo de cara fica na última posição
   */
}

module.exports = RankingPosition;