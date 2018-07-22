'use strict';

module.exports = (nodecg) => {
	if(nodecg.bundleConfig.hasOwnProperty("key")) {
		return (req, res, next) => {
			if(req.body.hasOwnProperty("key") && req.body["key"] === nodecg.bundleConfig.key) {
				next();
			} else {
				res.status(400).json({
					"status": "ERROR",
					"message": "Authentication failed"
				});
			}
		};
	} else {
		return (req, res, next) => {
			next();
		}
	}
};
