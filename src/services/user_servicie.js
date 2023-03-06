const pool = require('../database/Connection')
const sql = require('mssql')
const query = require('../database/query')
const {encryptPass, macthPass} = require('../helpers/bcrypt')

class user_service{
   
   
    async createUsers(data){       
    const contraseña_hash = await encryptPass(data.password)
     const nuevadata = {
        ...data,
        password: contraseña_hash
     }
     console.log(nuevadata.cedula);
    const register = await pool.request()
     .input("cedula", sql.BigInt, nuevadata.cedula)
     .input("tipo_doc", sql.VarChar(2), nuevadata.documentType)
     .input("nombre_usuario", sql.VarChar(50), nuevadata.name)
     .input("direccion_residencia", sql.VarChar(50), nuevadata.address)
     .input("email", sql.VarChar(50), nuevadata.email)
     .input("contraseña", sql.VarChar(2000), nuevadata.password)
     .execute(query.CreateUsersRegister)
     console.log(register);
     return register
   }
}

module.exports = user_service;