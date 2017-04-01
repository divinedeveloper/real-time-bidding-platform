var crypto = require('crypto');
var generatePassword = require('password-generator');
var nodemailer = require("nodemailer"),
	emailUtility = require('../config/email.js');

exports.postLogin = function (connection) {
	return function (req, res) {

		var email = req.body.email;
		var password = req.body.password;


		if (!isNaN(email)) {
			res.json("Please enter valid emailid");
			return false;
		}
		if (!password) {
			res.json("Please enter valid password");
			return false;
		}
		var pw = crypto.createHmac('sha1', 'abcdeg').update(password).digest('hex');
		console.log("PW : " + pw);
		var query = "Select iduser,type,email,password from blurbio.user where email='" + email + "';";
		connection.query(query, function (err, rows) {
			if (err != null) {
				res.end("Query error:" + err);
				return false;
			}
			if (rows.length > 0) {
				var id = rows[0].iduser,
					status = rows[0].type,
					email = rows[0].email,
					password = rows[0].password;

				if (password != pw) {
					res.json('The password you entered is incorrect');
					return false;
				}
				if (status == 'm')
					res.json('Weclome Merchant');
				else
					res.json('Weclome Bidder');
			} else {
				res.json('The email or password  you entered is incorrect');
				return false;
			}

		});
	}
};
exports.forgot = function (connection) {
	return function (req, res) {
		var email = req.body.email;
		var pass;

		if (!isNaN(email)) {
			res.json("Please enter valid emailid");
			return false;
		}

		pass = generatePassword(6, false);
		console.log(pass);
		var pw = crypto.createHmac('sha1', 'abcdeg').update(pass).digest('hex');
		//		console.log("PW : " + pw);
		var query = "CALL blurbio.fg('" + email + "','" + pw + "')";
		connection.query(query, function (err, rows) {
			if (err != null) {
				res.end("Query error:" + err);
				return false;
			}
			//			console.log(pass);
			var value = JSON.stringify(rows);


			if (value.length == 127) {
				res.json("Password as been sent to ur mail!!!Please Login with that");
				emailUtility.sendMail(email, pass);
			} else {
				res.json("Email incorrect");
				return false;
			}


		});

	}
};