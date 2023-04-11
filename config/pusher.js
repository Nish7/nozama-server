require('dotenv').config();
const Pusher = require('pusher');
const pusher_appId = process.env.pusher_appId;
const pusher_key = process.env.pusher_key;
const pusher_secret = process.env.pusher_secret;

const pusher = new Pusher({
	appId: pusher_appId,
	key: pusher_key,
	secret: pusher_secret,
	cluster: 'ap2',
	useTLS: true,
});

module.exports = pusher;
