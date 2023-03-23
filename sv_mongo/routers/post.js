const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const verifyToken = require("../middleware/auth")

//add post
// Posts a post and returns the response. This is the same as POST but we don't want to check the status
router.post('/', verifyToken, async (req, res) => {
    const { title, pdesc, url, status } = req.body
    if (!title)
        return res.status(400).json({ success: false, message: "Tittle is needed" })

    try {
        const newPost = new Post({
            title,
            pdesc,
            url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'Will Do',
            user: req.userId
        })
        await newPost.save()
        res.json({ success: true, message: "Đã thêm! Hy Vọng Sẽ Không Bỏ Giữa Chừng", post: newPost })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "MongoDB error" })
    }
})

//show post
// Finds posts for the user and replies with a list of posts. This is a GET
router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', ['username'])
        res.json({ success: true, posts })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "MongoDB error" })
    }
})

//update post
// Updates a post. This is a PUT and should only be used for post updates
router.put('/:id', verifyToken, async (req, res) => {
    const { title, pdesc, url, status } = req.body
    if (!title)
        return res.status(400).json({ success: false, message: "Tittle is needed" })
    try {
        let UpdatedPost = {
            title,
            pdesc: pdesc || '',
            url: (url.startsWith('https://') ? url : `https://${url}`) || '',
            status: status || 'Will Do'
        }
        const postUpdateCondition = { _id: req.params.id, user: req.userId }
        UpdatedPost = await Post.findOneAndUpdate(postUpdateCondition, UpdatedPost, { new: true })

        if (!UpdatedPost)
            return res.status(401).json({ success: false, message: 'Cannot Update Post' })
        res.json({ success: true, message: 'Update success', post: UpdatedPost })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "MongoDB error" })
    }
})
//delete post
// Delete a post. This is a bit tricky because we don't know the user's ID
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const postDeleteCondition = { _id: req.params.id, user: req.userId }
        const DeletePost = await Post.findOneAndDelete(postDeleteCondition)

        if (!DeletePost)
            return res.status(401).json({ success: false, message: 'Cannot Find Post to Delete' })
        res.json({ success: true, message: 'Delete success' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "MongoDB error" })
    }
})


module.exports = router