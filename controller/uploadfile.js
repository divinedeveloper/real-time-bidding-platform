exports.upload = function (connection) {
	return function (req, res) {
		var tmp_path = req.files.thumbnail.path;
		var tempstr = tmp_path.replace('\\', '\\\\');
		console.log("originalpath" + req.files.thumbnail.path);
		console.log("Modifiedpath" + tempstr);
		var query = "Insert into blurbio.uploads(path) values('" + tempstr + "');";
		console.log(query);
		connection.query(query, function (err, rows) {
			if (err != null) {
				res.end("Query error: " + err);
				return false;
			}
			res.json(rows);
		});
	}
};