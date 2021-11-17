const Certificado = require('../models/Certificado')

exports.getAllAes = function (req, res) {
    let certificado = new Certificado(req.file, null, req.session.user.email)
    certificado
        .readAllAEs()
        .then((resultado) => {
            res.render("pages/extensao", { certificado: resultado })
        })
        .catch((err) => {
            res.send(err);
        })
};

exports.getByIdAe = function (req, res) {
    const id = req.params.id_uploaded;
    console.log(req.params.id_uploaded)
    let certificado = new Certificado(null, null, req.session.user.email);
    certificado
        .readOneById(id)
        .then((resultado) => {
            console.log(resultado)
            res.render("pages/mostrar_ae", { certificado: resultado, layout: 'pages/mostrar_ae' })
        })
        .catch((err) => {
            res.send(err);
        });
};

exports.apagarCertificadoAes = function (req, res) {
    const key_name = req.params.key_name
    const id = req.params.id_uploaded
    let certificado = new Certificado(null, null, req.session.user.email)
    certificado
        .removerHorasAEs(id).then(certificado.apagarAws(key_name))
        .then(certificado.delete_certifications(id)).then(certificado.delete_uploaded_certifications(key_name))
        .then((resultado) => {
            res.redirect('/home')
        })
        .catch((err) => {
            res.send(err)
        })
};
