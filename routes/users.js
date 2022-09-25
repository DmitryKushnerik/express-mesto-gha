const router = require('express').Router();
const {
  getAllUsers, getUserById, createUser, updateUserInfo, updateUserAvatar,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me/', updateUserInfo);
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
