const pool = require("../config/db")

let Mission = ({ name, description, rewards, id_activity }) => {
  this.name = name;
  this.description = description;
  this.rewards = rewards;
  this.id_activity = id_activity;
}

Mission.prototype.listAll = () => {

}

Mission.prototype.listAllPerActivityType = () => {

}

Mission.prototype.search = (id_mission) => {

}

Mission.prototype.create = () => {

}

Mission.prototype.delete = (id_mission) => {

}

module.exports = Mission;