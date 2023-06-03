const bcrypt = require("bcryptjs")
const ObjectId = require("mongodb").ObjectId

const users = [
      {
    name: 'admin',
    lastName: 'admin',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('admin@admin.com', 10),
    isAdmin: true,
  },
  {
    _id:ObjectId("64330351f64cce281cb6eb05"),
    name: 'daisy',
    lastName: 'khoja',
    email: 'daisy@khoja.com',
    password: bcrypt.hashSync('daisy@khoja', 10),
  },
]

module.exports = users
