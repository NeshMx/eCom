// Required libraries

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs'); // Library to hash password
var Schema = mongoose.Schema;

// User schema attributes

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true
	},
	password: String,
	profile: {
		name: {
			type: String,
			default: ''
		},
		picture: {
			type: String, 
			default: ''
		}		
	},
	address: String,
	history: [{
		date: Date,
		paid: {
			type: Number,
			default: 0
		}
		//item: {}
	}]
});

// Hash password before saving it to DB

UserSchema.pre('save', function(argument) { // Uses pre-built method
	var user = this;
	if (!user.isModified('password')) {
		return next();
	}
	bcrypt.genSalt(10, function(err, salt) {
		if (err) {
			return next(err)
		}
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) {
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});

// Compare password in DB and typed

UserSchema.methods.comparePass = function(password) {
	return bcrypt.compareSync(password, this.password);
} // UserSchema always needs 'methods'


module.exports = mongoose.model('User', UserSchema);