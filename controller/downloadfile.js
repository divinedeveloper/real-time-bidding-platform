 exports.download = function (connection) {
 	return function (req, res) {

 		if (isNaN(req.params.id)) {
 			res.end("Enter valid input");
 			return false;
 		}
 		var query = "select * from blurbio.uploads where id='" + req.params.id + "';";
 		connection.query(query, function (err, rows) {
 			if (err != null) {
 				res.end("Query error: " + err);
 				return false;
 			}
 			if (rows.length == 0) {
 				res.json("No file exists");
 				return false;
 			} else {
 				var tempstr = rows[0].path.replace('\\', '/');
 				var file = 'E:/folder' + '/' + tempstr + '';
 				res.download(file);
 			}
 		});
 	}
 };