const express = require('express')
const router = express.Router();
const profileController = require('../../controller/profileController')

router.get('/', profileController.index);
router.post('/', profileController.edit);

module.exports = router;