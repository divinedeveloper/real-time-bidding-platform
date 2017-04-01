exports.get = function (connection) {
	return function (req, res) {
		var query = "SELECT * FROM blurbio.blurb WHERE delflag=0";
		connection.query(query, function (err, rows) {
			if (err != null)
				res.json(err);
			else if (rows.length == 0)
				res.json("No Blurb available");
			else
				res.send({
					error: false,
					message: "Available Blurb",
					response: rows
				});

		});
	}
};

//exports.getbyid = function (connection) {
//	return function (req, res) {
//		if (isNaN(req.params.id)) {
//
//			res.end("Enter valid blurbid");
//			return false;
//		}
//		var query = "SELECT * FROM blurbio.blurb  WHERE id=" + req.params.id + " AND delflag=0";
//		connection.query(query, function (err, rows) {
//			if (err != null)
//				res.json(err);
//			else if (rows.length == 0)
//				res.json("No rows fetched");
//			else
//				res.send({
//					error: false,
//					message: "Available Blurb",
//					response: rows
//				});
//
//		});
//	}
//};
exports.getbyid = function (connection) {
	return function (req, res) {
		if (isNaN(req.params.id)) {

			res.end("Enter valid blurbid");
			return false;
		}

		var query = "select user.name,user.company,user.phone,user.description,user.logo,blurb.* from blurbio.user inner join blurbio.blurb on user.iduser=blurb.userID where blurb.id='" + req.params.id + "' and blurb.delflag=0;";
		connection.query(query, function (err, rows) {
			if (err != null)
				res.json(err);
			else if (rows.length == 0)
				res.json("No Blurbs Available");
			else
				res.send({
					error: false,
					message: "Available Blurb",
					response: rows[0]
				});

		});
	}
};

exports.blurbid = function (connection) {
	return function (req, res) {
		if (isNaN(req.params.id)) {

			res.end("Enter valid blurbid");
			return false;
		}

		var query = "select user.name,offer.offerprice,offer.time  from blurbio.user inner join blurbio.offer on  user.iduser=offer.userid join blurbio.blurb on blurb.id = offer.blurbId where blurb.id='" + req.params.id + "';";
		connection.query(query, function (err, rows) {
			if (err != null)
				res.json(err);
			else if (rows.length == 0)
				res.json("No offers Available");
			else
				res.send({
					error: false,
					message: "Available offers",
					response: rows
				});

		});
	}
};

exports.post = function (connection) {
	return function (req, res) {
		var link = req.body.link;
		var price = req.body.price;
		var title = req.body.title;
		var description = req.body.description;
		var url = req.body.url;
		var filename = req.body.filename;
		var userID = req.body.userID;

		if (isNaN(price) || !isNaN(title) || !isNaN(description) || !url || !filename || !link || isNaN(userID)) {

			res.end("Enter valid Input");
			return false;
		}
		var query = "CALL blurbio.createblurb('" + link + "','" + price + "','" + title + "','" + description + "','" + url + "','" + filename + "'," + userID + ")";
		console.log(query);
		connection.query(query, function (err, rows) {
			if (err != null) {
				res.end("Query error:" + err);
			} else {
				res.contentType('application/json');
				res.json({
					error: false,
					message: "Blurb Created",
					response: rows
				})
				res.end();
			}
		});
	}
};

exports.delete = function (connection) {
	return function (req, res) {
		if (isNaN(req.params.id)) {

			res.end("Enter valid blurbid");
			return false;
		}
		var query = "UPDATE blurbio.blurb SET delflag = 1 WHERE id = " + req.params.id;
		console.log(query);
		connection.query(query, function (err, rows) {
			// There was an error or not?
			if (err != null) {
				res.end("Query error:" + err);
			} else {
				res.contentType('application/json');
				res.send({
					error: false,
					message: "Blurb Deleted...",
					response: rows
				});
				res.end();
			}
		});
	}
};

exports.put = function (connection) {
	return function (req, res) {
		if (isNaN(req.params.id) || !isNaN(req.body.title) || !isNaN(req.body.desc) || !req.body.url || !req.body.file) {

			res.end("Enter valid input");
			return false;
		}
		var query = "UPDATE blurbio.blurb SET title='" + req.body.title + "',description='" + req.body.desc + "',url='" + req.body.url + "',filename='" + req.body.file + "' WHERE id = " + req.params.id;
		console.log(query);
		connection.query(query, function (err, rows) {
			if (err != null) {
				res.end("Query error:" + err);
			} else {
				res.contentType('application/json');
				res.json({
					error: false,
					message: "Updated Blurb Succesfully",
					response: rows
				})
				res.end();
			}
		});
	}
};