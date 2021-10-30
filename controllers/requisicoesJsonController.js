const Certificado = require('../models/Certificado')
const Course = require('../models/Course')


exports.cursos_json = function (req, res) {
  let course = new Course()
  course.recuperarCursos(req.params.id_course_types)
    .then((cursos_recuperados) => {
      res.json({ cursos_recuperados: cursos_recuperados })
    })
    .catch(function (err) {
      res.send(err)
    })
}

exports.subcategorias_json = function (req, res) {
  let certificado = new Certificado()
  certificado.readCatAcsSubCategoria(req.params.id_tipo_atividade_acs_fk)
    .then((subcategorias_recuperadas) => {
      res.json({ subcategorias_recuperadas: subcategorias_recuperadas })
    })
    .catch((err) => {
      res.send(err)
    })
}