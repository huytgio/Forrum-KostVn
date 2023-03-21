// This is the function that handles user registration and password auth. We need to be careful about this because it's called in two places : 1
const express = require('express');
const router = express.Router()
const argon2 = require('argon2')
const jwtoken = require('jsonwebtoken')
const User = require('../models/User')
const verifyToken = require('../middleware/auth')

router.get('/', (req, res) => res.send('USER ROUTE'))


router.get('/verify', verifyToken, async (req, res) => {
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
//sign up
// Register a new user. This is a POST and should return a JSON object
router.post('/register', async (req, res) => {
    const { username, password, c_password } = req.body

    if (!username || !password)
        return res.status(400).json({ success: false, message: "Missing Username or Password" })

    try {
        const user = await User.findOne({ username })
        if (user)
            return res.status(400).json({ success: false, message: "User already Taken, Please Take Other" })
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({ username, password: hashedPassword })
        await newUser.save()

        const accesstoken = jwtoken.sign({ userId: newUser._id }, 'jkiyondnaiosjw')
        res.json({ success: true, message: "User created successfully", accesstoken })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "MongoDB error" })
    }
})
//login
// Logs in a user. Returns a 401 if the user could not be found
router.post('/login', async (req, res) => {
    const { username, password } = req.body
    //check sign up
    if (!username || !password)
        return res.status(400).json({ success: false, message: "miss user or pass" })

    try {
        const user = await User.findOne({ username })
        if (!user)
            return res.status(400).json({ success: false, message: "incorrect username" })
        /* const hashedPassword = await argon2.hash(password)
        const newUser = new User({username,password:hashedPassword})
        await newUser.save() */
        const passwordValid = await argon2.verify(user.password, password)
        if (!passwordValid)
            return res.status(400).json({ success: false, message: "incorrect password" })

        const accessToken = jwtoken.sign(
            { userId: user._id },
            'jkiyondnaiosjw'
        )
        res.json({ success: true, message: "login success", accessToken })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "MongoDB error" })
    }
})

module.exports = router