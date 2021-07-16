const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userIdentitySchema = new Schema({
	UserName: {
		type: String,
		//required: [true, "Please, include an username"]
	},
	UserClaims: {
		type: String,
		//required: [true, "Please, include the user claims"]
	},
	UserRoles: {
		type: String,
		//required: [true, "Please, include an user role"]
	}
});

const UserIdentity = mongoose.model('UserIdentity', userIdentitySchema);
module.exports = UserIdentity;
