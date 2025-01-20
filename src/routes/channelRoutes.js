const express = require('express');
const channelController = require('../Controller/ChannelController');
const permissionCheck = require('../MiddleWares/permissionCheck');


const router = express.Router();

router.get('/',permissionCheck.verifyUserPermission("ADMIN"), channelController.getAllChannels);
router.post('/',permissionCheck.verifyUserPermission('MODERATOR'), channelController.createChannel);
router.get('/:id',permissionCheck.verifyUserPermission("USER"), channelController.getChannelById);
router.put('/:id',permissionCheck.verifyUserPermission('MODERATOR','ADMIN'), channelController.updateChannel);
router.delete('/:id',permissionCheck.verifyUserPermission('ADMIN','MODERATOR'), channelController.deleteChannel);

module.exports = router;
