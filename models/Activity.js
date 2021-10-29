const pool = require("../config/db")

let Activity = ({ quantity, hours_per_instance, id_type }) => {
  this.quantity = quantity
  this.hours_per_instance = hours_per_instance
  this.id_type = id_type
}

Activity.prototype.listAll = () => {

}

Activity.prototype.listAllPerType = () => {

}

Activity.prototype.listAllPerSubcategory = () => {

}

Activity.prototype.create = () => {

}

Activity.prototype.delete = (id_activity) => {

}

module.exports = Activity;