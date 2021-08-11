const express = require('express')
const router = express.Router()
const argon2 = require('argon2') // xac minh mat khau
const jwt = require('jsonwebtoken') //quan li viec login, logout, xac thuc nguoi dung
const UserController = require('../controller/usercontroller') 
const verifyToken = require('../middleware/auth')
const passport = require('passport');
const { check, validationresult} = require('express-validator')


const authRouter = express.Router() 



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


authRouter.post('/register', UserController.regitserUser)
router.get('/login', (req, res) => res.render('login'))

//  validator-express
router.post("/register", [
    check("emaild", "Please input a valid email")
        .isEmail(),
    check("password", "Please input a password with a min length of 6")
        .isLength({min: 6})
], async (req, res) => {
    const { email, password } = req.body;

    // Validate the inputs 
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            errors: errors.array()
        })
    }

    // Validate if the user doesnt already exist;
    let user = users.find((user) => {
        return user.email === email
    });

    if(user) {
        return res.status(422).json({
            errors: [
                {
                    msg: "This user already exists",
                }
            ]
        })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the password into the db
    users.push({
        email,
        password: hashedPassword
    });

    const token = await JWT.sign({ email }, "nfb32iur32ibfqfvi3vf932bg932g932", {expiresIn: 360000});

    res.json({
        token
    })
})

authRouter.post('/login', async (req, res) => {
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



  authRouter.get('/me', (req,res)=> {
	  console.log(req.headers.authorization); 
  }) 


module.exports = {
	router, 
	authRouter
}
