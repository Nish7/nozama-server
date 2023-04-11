const Pusher = require('pusher');
const config = require('config');

const pusher = new Pusher({
	appId: config.get('pusher_appId'),
	key: config.get('pusher_key'),
	secret: config.get('pusher_secret'),
	cluster: 'ap2',
	useTLS: true,
});

module.exports = pusher;
