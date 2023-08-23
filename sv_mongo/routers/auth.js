
const express = require('express');
const router = express.Router()
// const argon2 = require('argon2')
const bcrypt = require('bcryptjs');
const jwtoken = require('jsonwebtoken')
const User = require('../models/User')
const verifyToken = require('../middleware/auth')

router.get('/', (req, res) => res.send('USER ROUTE'))


router.get('/verify', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password')
        if (!user)
            return res.status(400).json({ success: false, message: 'Không tìm thấy tên đăng nhập' })
        res.json({ success: true, user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Lỗi Hệ Thống' })
    }
})
//sign up

router.post('/register', async (req, res) => {
    const { username, password, c_password } = req.body

    if (!username || !password)
        return res.status(400).json({ success: false, message: "Thiếu tên đăng nhập hoặc mật khẩu" })

    try {
        const user = await User.findOne({ username })
        if (user)
            return res.status(400).json({ success: false, message: "Tên người dùng đã tồn tại, mời nhập tên khác" })
        // const hashedPassword2 = await argon2.hash(password)
        const hashedPassword = await bcrypt.hash(password)
        const newUser = new User({ username, password: hashedPassword })
        await newUser.save()

        const accessToken = jwtoken.sign({ userId: newUser._id }, 'jkiyondnaiosjw')
        res.json({ success: true, message: "Đăng ký thành công", accessToken })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Lỗi Hệ Thống" })
    }
})
//login

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    //check sign up
    if (!username || !password)
        return res.status(400).json({ success: false, message: "Thiếu tên đăng nhập hoặc mật khẩu" })

    try {
        const user = await User.findOne({ username })
        if (!user)
            return res.status(400).json({ success: false, message: "Sai tên đăng nhập" })
        /* const hashedPassword = await argon2.hash(password)
        const newUser = new User({username,password:hashedPassword})
        await newUser.save() */
        // const passwordValid2 = await argon2.verify(user.password, password)
        const passwordValid = await bcrypt.verify(user.password, password)
        if (!passwordValid)
            return res.status(400).json({ success: false, message: "Sai mật khẩu" })

        const accessToken = jwtoken.sign(
            { userId: user._id },
            'jkiyondnaiosjw'
        )
        res.json({ success: true, message: "Đăng nhập thành công", accessToken })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Lỗi hệ thống" })
    }
})

module.exports = router