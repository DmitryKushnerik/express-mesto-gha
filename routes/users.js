const router = require('express').Router();
const {
  getAllUsers, getUserById, updateUserInfo, updateUserAvatar, getInfoAboutMe,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.get('/me/', getInfoAboutMe);
router.patch('/me/', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
