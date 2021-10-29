const pool = require("../config/db");

let CourseType = function ({ name, description }) {
  this.name = name;
  this.description = name;
  this.errors = [];
}

CourseType.prototype.recuperarTiposCursos = function () {
  const consulta = 'select * from tipo_curso'
  const values = []
  return new Promise((resolve, reject) => {
    pool.query(consulta, values, (error, results) => {
      if (error) {
        reject("Erro ao cadastrar o aluno!")
      } else {
        tipos_cursos_recuperados = results.rows
        console.log(tipos_cursos_recuperados)
        // resolve("Usuário inserido com sucesso!")
        resolve(tipos_cursos_recuperados)
      }
    });
  });
};

// Não implementado
CourseType.prototype.create = function () {

}

module.exports = CourseType;