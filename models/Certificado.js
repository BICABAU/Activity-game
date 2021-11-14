const pool = require("../config/db")
const aws = require('aws-sdk')
const s3 = new aws.S3()

let Certificado = function (file, certificado, email) {
    this.file = file
    this.certificado = certificado
    this.email = email
    this.errors = []
}

Certificado.prototype.create = function () {
    const consulta = 'INSERT INTO certificados (tipo_de_atividade,categoria_atividade,subcategoria_atividade,qtd_horas,nome,tamanho,chave,url, email_fk, descricao_atividade, periodo_realizado) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)'
    const values = [this.certificado.tipo_de_atividade, this.certificado.categoria_atividade, this.certificado.subcategoria_atividade, this.certificado.qtd_horas, this.file.key, this.file.size, this.file.originalname, this.file.location, this.email, this.certificado.descricao, this.certificado.periodo]
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Erro ao inserir certificado!" + error)
            } else {
                resolve("Certificado inserido com sucesso!")
            }
        });
    });
}

Certificado.prototype.readCatAcsSubCategoria = function (string) {

<<<<<<< HEAD
    const consulta = 'SELECT id_activity_types, name_subcategory FROM activity_types' +
        ` WHERE is_complementary_activity = TRUE AND name = '${string}'`
=======
    const consulta = 'SELECT id_activity_types, name_subcategory, id_type FROM activity_types join activities ON (id_type = id_activity_types)' +
        ` WHERE is_complementary_activity = TRUE AND name = '${string}' OR is_atpas_activity = TRUE AND name = '${string}'`
>>>>>>> miracle
    console.log(consulta)
    const values = []
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Erro ao retornar cursos de um determinado tipo!")
            } else {
                subcategoria_recuperada = results.rows
                console.log(subcategoria_recuperada)
                resolve(subcategoria_recuperada)
            }
        });
    });
};

Certificado.prototype.readAllACs = function (resultado) {
    const consulta = "select certifications.name, certifications.id_uploaded ,activity_types.name_subcategory from uploaded_certifications join certifications on (id_uploaded = id) join activities on (certifications.id_activity = activities.id_activities) join activity_types on(activities.id_type = activity_types.id_activity_types ) join users on (certifications.id_user_fk = users.id_user) where users.id_user = $1"
    const values = [resultado.id_user]
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Erro ao recuperar os certificados!" + error)
            } else {
                resultado = results.rows
                console.log(resultado)
                resolve(resultado);
            }
        });
    });
}

Certificado.prototype.readCatAes = function () {
    const consulta = "SELECT name, id_activity_types, is_extension_activity FROM activity_types AS atp WHERE is_extension_activity = TRUE"
    return new Promise((resolve, reject) => {
        pool.query(consulta, (error, results) => {
            if (error) {
                reject("Não foi possivel ler as categorias" + error)
            } else {
                resultado_categoria = results.rows
                resolve(resultado_categoria)
            }
        })
    })
}

Certificado.prototype.readCatAcs = function () {
<<<<<<< HEAD
    const consulta = "SELECT name FROM activity_types AS atp" +
        " WHERE is_complementary_activity = TRUE" +
        " GROUP BY name";
=======
    const consulta = "SELECT name, is_complementary_activity, is_atpas_activity FROM activity_types AS atp" +
        " WHERE is_complementary_activity = TRUE OR is_atpas_activity = TRUE" +
        " GROUP BY name,is_complementary_activity, is_atpas_activity";
>>>>>>> miracle

    return new Promise((resolve, reject) => {
        pool.query(consulta, (error, results) => {
            if (error) {
                reject("Não foi possivel ler as categorias" + error)
            } else {
                resultado_categoria = results.rows
                console.log(resultado_categoria)
                resolve(resultado_categoria)
            }
        })
    })
}

Certificado.prototype.readAllAEs = function () {
    const consulta = "select id_certification, description, activity_start, activity_end, amount_hours, id_activity, id_uploaded from certifications inner join users on (id_user = $1)";
    const values = [this.id_user]
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Erro ao recuperar os certificados!" + error)
            } else {
                resultado = results.rows
                resolve(resultado);
            }
        });
    });
}

Certificado.prototype.readAll = function () {
    const consulta = "select * from uploaded_certifications inner join certifications on (id = id_certification) inner join users on" +
        "(id_user_fk = id_user) where email = $1"
    const values = [this.email]
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Erro ao recuperar os certificados!" + error)
            } else {
                resultado = results.rows
                resolve(resultado);
            }
        });
    });
}

Certificado.prototype.readOneById = function (id_certificado) {
    const consulta = "select * from uploaded_certifications join certifications on (id = $1)";
    const values = [id_certificado]
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Erro ao recuperar os certificados!" + error)
            } else {
                resultado = results.rows
                console.log(resultado)
                resolve(resultado);
            }
        });
    });
}

Certificado.prototype.delete_uploaded_certifications = function (name) {
    const consulta = "DELETE FROM uploaded_certifications u where u.key_name =$1";
    const values = [name]
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Não foi possivel apagar o certificado!" + error)
            } else {
                resolve("Certificados apagados com sucesso")
            }
        });
    });
}

Certificado.prototype.delete_certifications = function (name) {
    const consulta = "DELETE FROM certifications u where u.id_uploaded=$1";
    const values = [name]
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Não foi possivel apagar o certificado!" + error)
            } else {
                resolve("Certificados apagados com sucesso")
            }
        });
    });
}

Certificado.prototype.apagarAws = function (name) {
    s3.deleteObject({
        Bucket: 'upload-server-ifpi',
        Key: name,
    }).promise()
}

Certificado.prototype.removerHorasACs = function (id) {
    const consulta = "UPDATE users SET complementary_activity = complementary_activity - amount_hours FROM certifications u where u.id_uploaded = $1 AND email = $2"
    const values = [id, this.email]
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Não foi possivel contabilizar as horas!" + error)
            } else {
                resolve("Horas removidas com sucesso")
            }
        });
    });
}

Certificado.prototype.removerHorasAEs = function (id) {
    const consulta = "UPDATE users SET extension_activity = extension_activity - amount_hours FROM certifications u where u.id_uploaded = $1 AND email = $2"
    const values = [id, this.email]
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Não foi possivel contabilizar as horas!" + error)
            } else {
                resolve("Horas removidas com sucesso")
            }
        });
    });
}

module.exports = Certificado