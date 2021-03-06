var configuration = function () {
	switch (process.env.NODE_ENV) {
	case 'development':
		var config = {
			db: 'blurbDB',
			username: 'root',
			password: 'root',
			host: 'http://localhost:3000/',
			port: 3000,
			emailFrom: "donyferns12@gmail.com",
			encrypt_pass: "abcd",
			encrypt_decrypt_cookie: "pass",
			value: 86400000,
			publish_key: 'demo',
			subscribe_key: 'demo'
		}

		return config;

	case 'staging':
		var config = {
			db: 'blurbDB',
			username: 'root',
			password: 'root',
			host: 'http://54.164.68.205:3000/',
			port: 3000,
			emailFrom: "donyferns12@gmail.com",
			encrypt_pass: "abcd",
			encrypt_decrypt_cookie: "pass",
			value: 86400000,
			publish_key: 'demo',
			subscribe_key: 'demo'
		}

		return config;


	case 'production':
		var config = {
			db: 'blurbDB',
			username: 'root',
			password: 'root',
			host: 'http://173.46.154.50:4000/',
			port: 4189,
			emailFrom: "donyferns12@gmail.com",
			encrypt_pass: "abcd",
			encrypt_decrypt_cookie: "pass",
			value: 86400000,
			publish_key: 'demo',
			subscribe_key: 'demo'
		}

		return config;

	case 'test':
		var config = {
			db: 'blurbDB',
			username: 'root',
			password: 'root',
			host: 'http://localhost:3000/',
			port: 3000,
			emailFrom: "donyferns12@gmail.com",
			encrypt_pass: "abcd",
			encrypt_decrypt_cookie: "pass",
			value: 86400000,
			publish_key: 'demo',
			subscribe_key: 'demo'
		}

		return config;

	}
}


module.exports.configuration = configuration;