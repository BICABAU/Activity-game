const pool = require("../config/db")

let UploadedCertifications = ({ key_name, size, url, name }) => {
  this.key_name = key_name;
  this.name = name;
  this.size = size;
  this.url = url;
}

UploadedCertifications.prototype.listAll = () => {
  /**
   * Listar todos os arquivos upados no servidor com JOIN em usuarios
   * para mostrar os respectivos "donos"
   */
}

UploadedCertifications.prototype.create = () => {
  /**
   * Essa função será chamada no momento que o usuario for criar um 
   * novo certificado
   */
}

UploadedCertifications.prototype.delete = (id_user, id_uploaded) => {
  /**
   * Só pode deletar um arquivo se for o mesmo usuario que upou
   */

}

UploadedCertifications.prototype.deleteAWS = (id_user, id_uploaded) => {
  /**
   * Só pode deletar um arquivo se for o mesmo usuario que upou
   */

}

module.exports = UploadedCertifications;