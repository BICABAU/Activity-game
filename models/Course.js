const pool = require("../config/db");

let Course = function ({
  name,
  description,
  max_complementary_activity,
  max_extension_activity,
  id_course_type,
  id_academies
}) {
  this.name = name
  this.description = description
  this.max_complementary_activity = max_complementary_activity
  this.max_extension_activity = max_extension_activity
  this.id_course_type = id_course_type
  this.id_academies = id_academies
  this.errors = [];
}

Course.prototype.recuperarCursos = function (tipo_curso) {
  const consulta = 'SELECT * from cursos inner join tipo_curso' +
    ' ON (cursos.id_tipo_curso_fk = tipo_curso.id_tipo_curso)' +
    ` WHERE id_tipo_curso_fk = ${tipo_curso}`

  const values = []
  return new Promise((resolve, reject) => {
    pool.query(consulta, values, (error, results) => {
      if (error) {
        reject("Erro ao retornar cursos de um determinado tipo!")
      } else {
        cursos_recuperado = results.rows
        console.log(cursos_recuperado)
        // resolve("Usuário inserido com sucesso!")
        resolve(cursos_recuperado)
      }
    });
  });
};

// Não implementado
Course.prototype.create = function () { }

module.exports = Course;