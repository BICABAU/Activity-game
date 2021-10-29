const pool = require("../config/db")

let Certification = ({
  name,
  description,
  activity_start,
  activity_end,
  amount_hours,
  amount_valid_hours,
  id_activity,
  id_uploaded,
  id_user
}) => {
  this.name = name;
  this.description = description;
  this.activity_start = activity_start;
  this.activity_end = activity_end;
  this.amount_hours = amount_hours;
  this.amount_valid_hours = amount_valid_hours;
  this.id_activity = id_activity;
  this.id_uploaded = id_uploaded;
  this.id_user = id_user;
}

Certification.prototype.listAll = () => {

}

Certification.prototype.listPerUser = (id_user) => {

}

Certification.prototype.create = () => {
  /**
   * Antes de criar um novo certificado, precisa fazer o upload do arquivo,
   * se o arquivo não for upado, retornar um erro para o usuario tentar o processo
   * de novo 
   */
}

Certification.prototype.delete = (id_certification) => {

}

module.exports = Certification;