const pool = require("../config/db")


let Gamification = function (data, curso) {
  this.data = data;
  this.curso = curso;
  this.errors = [];
}



Gamification.prototype.selectUsersByCourse = function () {
  const consulta = 'SELECT nome, sobrenome, horas_acs, horas_aes FROM users u WHERE u.curso=$1 ORDER BY horas_acs ASC, horas_aes ASC'
  const values = [this.curso]
  return new Promise((resolve, reject) => {
    pool.query(consulta, values, (error, results) => {
      if (error) {
        reject("Erro ao recuperar os usuarios do ranking")
      } else {
        usuarios_recuperados_ranking = results.rows
        console.log(usuarios_recuperados_ranking)
        resolve(usuarios_recuperados_ranking)
      }
    });
  });
};

module.exports = Gamification;