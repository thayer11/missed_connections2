var express = require('express');
var router = express.Router();

var ctrlMessages = require('../controllers/message_controller.js');

router.route('/api/messages')
	.get(ctrlMessages.messagesGetAll)
	.post(ctrlMessages.messagesAddOne);
router.route('/api/response')
	.get(ctrlMessages.ResponseGetAll)
	.post(ctrlMessages.ResponsePostAll);

module.exports = router