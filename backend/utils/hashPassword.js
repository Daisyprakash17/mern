const bcrypt = require("bcryptjs")
const salt = bcrypt.genSaltSync(10)

const hashPassword = (password) =>{ return bcrypt.hashSync(password, salt)}
const comparePassword=(inputPassword,hashedPassword)=>{ 
    return   bcrypt.compareSync(inputPassword,hashedPassword);
}
module.exports = { hashPassword ,comparePassword}
