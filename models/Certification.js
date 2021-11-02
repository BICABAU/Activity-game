const pool = require("../config/db")

let Certification = function (
  certification_name,
  description,
  activity_start,
  activity_end,
  amount_hours,
  id_activity,
  id_uploaded,
  id_user
) {
  this.name = certification_name;
  this.description = description;
  this.activity_start = activity_start;
  this.activity_end = activity_end;
  this.amount_hours = amount_hours;
  this.amount_valid_hours = 0;//hoursValidation(amount_hours);
  this.id_activity = id_activity;
  this.id_uploaded = id_uploaded;
  this.id_user = id_user;
}

Certification.prototype.listAll = function () {

}

Certification.prototype.listPerUser = function (id_user) {

}

Certification.prototype.create = function () {
  const insert = 'INSERT INTO certifications' +
    ' (name, description, activity_start, activity_end, amount_hours, amount_valid_hours, id_activity, id_uploaded, id_user_fk)' +
    ' VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)' +
    ' RETURNING *';
  const values = [this.name, this.description, this.activity_start, this.activity_end, this.amount_hours, this.amount_valid_hours, this.id_activity, this.id_uploaded, this.id_user];
  // console.log("certification create - log - " + values)
  return new Promise((resolve, reject) => {
    pool.query(insert, values, (error, results) => {
      if (error) {
        reject("Create Certification:" + error)
      } else {
        resolve(results.rows[0])
      }
    })
  })
}

Certification.prototype.delete = function (id_certification) {

}

Certification.prototype.hoursValidation = function (amount_hours) {

}

module.exports = Certification;