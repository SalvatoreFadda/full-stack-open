const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: String,
  passwordHash: String,
  token: String
})

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.passwordHash = await bcrypt.hash(this.password, 10)
  }
  next()
})

module.exports = mongoose.model('User', userSchema)
