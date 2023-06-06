/* eslint-disable prettier/prettier */
const express = require('express');
const {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  getUser,
} = require('../controllers/userController');

const { signup, login } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
