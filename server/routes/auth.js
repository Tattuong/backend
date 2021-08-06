const express = require('express')
const router = express.Router()
const argon2 = require('argon2') // xac minh mat khau
const jwt = require('jsonwebtoken') //quan li viec login, logout, xac thuc nguoi dung
const UserController = require('../controller/usercontroller') 
const verifyToken = require('../middleware/auth')
const passport = require('passport');

// const logout = request ('express-passport-logout');

router.get('/register',(req, res) => res.render('register'))
router.get('/home', (req, res) => res.render('home'))


const User = require('../models/User')
router.get('/', (req, res) => res.render('index'))

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
// xu ly yeu cau, ham xy ly 
//call api login - get acces token
//xu li khuon mau
// noi chuyen qua database = bang bat dong bo

router.get('/', verifyToken, async (req, res) => {
	try {
		const user = await User.findById(req.userId).select('-password')
		if (!user)
			return res.status(400).json({ success: false, message: 'User not found' })
		res.json({ success: true, user })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})


router.post('/register', UserController.regitserUser)
router.get('/login', (req, res) => res.render('login'))

router.post('/login', async (req, res) => {
	const { username, password, } = req.body

	// Simple validation
	if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Missing username or password' })

	try {
		// Check for existing user
		const user = await User.findOne({ username })
		if (!user)
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect username or password' })

		// Username found
		const passwordValid = await argon2.verify(user.password, password)
		if (!passwordValid)
			return res
				.status(400)
				.json({ success: false, message: 'Incorrect username or password' })

		// All good
		// Return token
		const accessToken = jwt.sign(
			{ userId: user._id },
			process.env.ACCESS_TOKEN_SECRET
		)

		res.json({
			success: true,
			message: 'User logged in successfully',
			accessToken
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})


router.get('/logout', async (req, res) => {
	req.logout();
	req.flash('success', 'You are logged out');
	res.redirect('/');
  });

  
module.exports = router
