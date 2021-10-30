const pool = require("../config/db")
const bcrypt = require("bcryptjs")



let User = function ({
    matriculation,
    password_hash,
    first_name,
    last_name,
    email,
    cpf,
    phone,
    birthdate,
    complementary_activity,
    extension_acitivity,
    points_total_amount,
    curso
}) {
    this.matriculation = matriculation,
        this.password_hash = password_hash,
        this.first_name = first_name,
        this.last_name = last_name,
        this.email = email,
        this.cpf = cpf,
        this.phone = phone,
        this.birthdate = birthdate,
        this.complementary_activity = complementary_activity,
        this.extension_acitivity = extension_acitivity,
        this.points_total_amount = points_total_amount,
        this.curso= curso
    this.errors = []
}


User.prototype.create = function () {
    let salt = bcrypt.genSaltSync(10)
    this.password_hash = bcrypt.hashSync(this.password_hash, salt)
    const consulta = 'INSERT INTO users(first_name, last_name, email, cpf, phone, password_hash, birthdate, id_course, matriculation) values($1, $2, $3, $4, $5, $6, $7, $8,lower($9))'
    const values = [this.first_name, this.last_name, this.email, this.cpf, this.phone,this.password_hash, this.birthdate, this.curso, this.matriculation]
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
              console.log(values)
                reject("error: " + error)
            } else {
                console.log(results)
                resolve("Usuário inserido com sucesso!")
            }
        });
    });

};

User.prototype.login = function () {
    return new Promise((resolve, reject) => {
        this.readByEmail().then((usuarioRecuperado) => {
            if (usuarioRecuperado && bcrypt.compareSync(this.data.senha, usuarioRecuperado.senha)) {
                resolve('Login confere')
            } else {

                reject('Dados de login não conferem')
            }
        }).catch(() => { });
    });
};

User.prototype.readByEmail = function () {
    const consulta = "SELECT * FROM users u WHERE u.email= $1";
    const values = [this.data.email];

    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("E-mail não encontrado");
            } else {
                usuarioRecuperado = results.rows[0];
                console.log(usuarioRecuperado)
                resolve(usuarioRecuperado);

            }
        });
    });
};

User.prototype.alterarDados = function () {

    let salt = bcrypt.genSaltSync(10)
    this.data.senha = bcrypt.hashSync(this.data.senha, salt)
    const consulta = "UPDATE users set nome=$1, nascimento=$2, senha=$3 WHERE email=$4";
    const values = [this.data.nome, this.data.nascimento, this.data.senha, this.data.email];
    console.log(consulta)

    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Não foi possivel alterar os Dados");
            } else {
                resolve("Informações alteradas com sucesso");
            }
        });
    });
};

User.prototype.getTotalHours = function () {
    /**
     * Fazer um select e retornar somente as
     * -> Horas Complementares
     * -> Horas de extensão
     */
}

User.prototype.countComplementaryHours = function () { }

User.prototype.countExtensionHours = function () { }

User.prototype.countAmountPoints = function () { }

module.exports = User