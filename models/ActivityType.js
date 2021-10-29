const pool = require("../config/db")

let ActivityType = ({
  name,
  description,
  is_complementary_activity,
  is_extension_activity,
  name_subcategory,
  description_subcategory
}) => {
  this.name = name
  this.description = description
  this.is_complementary_activity = is_complementary_activity
  this.is_extension_activity = is_extension_activity
  this.name_subcategory = name_subcategory
  this.description_subcategory = description_subcategory
}

ActivityType.prototype.listAll = () => {

}

ActivityType.prototype.create = () => {

}

ActivityType.prototype.delete = (id_type) => {

}

module.exports = ActivityType;