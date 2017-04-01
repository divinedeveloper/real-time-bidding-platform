var moment = require('moment');


exports.offerAdd = function (connection) {
	return function (req, res) {
		var bId = req.body.blurbId;
		var uId = req.body.userid;
		var price = req.body.offerprice;
		//		var otime = req.body.time;

		if (isNaN(bId) || isNaN(uId)) {
			res.json("Enter valid Input");
			return false;
		}

		var otime = moment(parseInt(req.body.time)).format('YYYY-MM-DD HH:mm:ss');
		console.log(otime);
		var query = "INSERT INTO blurbio.offer (blurbId,userid,offerprice,time) values (" + bId + "," + uId + ",'" + price + "', now());";
		console.log("QUERY : " + query)
		connection.query(query, function (err, rows, fields) {
			console.log(query);
			if (err != null) {
				console.log(err);
				res.json({
					error: true,
					message: "Offer Not Created",
					response: err
				});
			} else {
				res.json({
					error: false,
					message: "Offer Created",
					response: rows
				})
			};

			//var PUBNUB = require("../pubnub.js")
			//
			//			var pubnub = PUBNUB({
			//				publish_key: "demo",
			//				subscribe_key: "demo"
			//				//cipher_key : "demo"
			//			});
			//
			//			pubnub.publish({
			//				post: false,
			//				channel: 'blurbid-' + blurbid,
			//				message: {
			//					name, biddingprice, datetime
			//				},
			//				callback: function (details) {
			//					var success = details[0],
			//						response = details[1];
			//
			//					if (success) console.log("Success!", response);
			//					if (!success) console.log("Fail!", response);
			//				}
			//			});


		})
	}
};

// Get Blurb with Placed Offer

exports.getOffer = function (connection) {
	return function (req, res) {
		var query = "select blurbio.blurb.title as Blurbs, count(blurbio.offer.userid) as OffersPlaced from blurbio.offer join blurbio.blurb on blurbio.blurb.id = blurbio.offer.blurbId GROUP BY blurbio.offer.blurbId ORDER BY OffersPlaced DESC";
		connection.query(query, function (err, rows) {
			if (err != null) {
				console.log(err)
				res.json(err);
			} else if (rows.length == 0)
				res.json("Offer On Blurb Not Available");
			else {
				res.json({
					error: false,
					message: "Offer On Blurb Available",
					response: rows
				});
			}
		});
	}
};