const jwt = require('jsonwebtoken')
const User = require('../models/User')

const argon2 = require('argon2') // xac minh mat khau

const regitserUser = async(req, res)=>{
    const { username, email, password} = req.body
    console.log(req.body)
    if (!username || !password)
		return res
			.status(400)
			.json({ success: false, message: 'Missing username or password' })
	try {
		const user = await User.findOne({ username })
		if (user)
			return res
				.status(400)
				.jsonwebtokenjson({ success: false, message: 'Username already taken' })

		// All good
		const hashedPassword = await argon2.hash(password)
		const newUser = new User({ username, email, password: hashedPassword })
		await newUser.save()


		// Return token
		const accessToken = jwt.sign(
			{ userId: newUser._id },
			process.env.ACCESS_TOKEN_SECRET
		)

		res.json({
			success: true,
			message: 'User created successfully',
			accessToken,
		})
			
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
}

 
module.exports ={
    regitserUser
}


