const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
	name: String,
	content: String
})

module.exports = mongoose.model("userSchema", userSchema)