const User = require('../models/User')

exports.login = function (req, res) {
  let user = new User(req.body);
  user
    .login()
    .then((result) => {
      req.session.user = {
        first_name: usuarioRecuperado.first_name,
        last_name: usuarioRecuperado.last_name,
        email: usuarioRecuperado.email,
        cpf: usuarioRecuperado.cpf,
        phone: usuarioRecuperado.phone,
        password_hash: usuarioRecuperado.password_hash,
        birthdate: usuarioRecuperado.birthdate,
        complementary_activity: usuarioRecuperado.complementary_activity,
        extension_activity: usuarioRecuperado.extension_activity,
        matriculation: usuarioRecuperado.matriculation
      }
      req.session.save(() => {
        res.redirect('/home')
      })
    })
    .catch((err) => {
      res.send(err)
    })
}

exports.logout = function (req, res) {
  req.session.destroy(() => {
    res.redirect("/")
  })
}