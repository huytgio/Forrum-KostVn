// Adds or updates a comment. This is a bit tricky because we don't want to create a new CRDT or Post in the middle of a comment
const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const Cmt = require('../models/Cmt')
const verifyToken = require("../middleware/auth")

//add
// Create a comment in the post. POST / : postId / verifyToken Posts are validated before they are saved
router.post('/:postId', verifyToken, async (req, res) => {
    const poststtile = await Post.find({ _id: req.params.postId }).select('title')
    const { post, content, cmttype } = req.body
    if (!content)
        return res.status(400).json({ success: false, message: "content is needed" })

    try {
        const newCmt = new Cmt({
            post: req.params.postId,
            content,
            cmttype: cmttype,
            user: req.userId
        })
        await newCmt.save()
        res.json({ success: true, message: "Comment Posted", cmt: newCmt, poststtile })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error })
    }
})

//show cmt by Post
// Finds and returns posts matching the given route. This is a GET and should be used for post / { postId }
router.get('/:postId', verifyToken, async (req, res) => {
    try {
        const cmts = await Cmt.find({ post: req.params.postId }).populate('user', ['username'])
        res.json({ success: true, cmts })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "MongoDB error" })
    }
})
//show cmt by User

// Finds and returns posts for the user. This is a GET request so we don't have to worry about it
router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Cmt.find({ user: req.userId }).populate('user', ['username'])
        res.json({ succes: true, posts })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "MongoDB error" })
    }
})

//update
// Updates a comment. This is the same as ` PUT ` except that it does not require a verifyToken
router.put('/:postId/:cmtId', verifyToken, async (req, res) => {
    const poststtile = await Post.find({ _id: req.params.postId })
    const { content, cmttype } = req.body
    if (!content)
        return res.status(400).json({ success: false, message: "content is needed" })

    try {
        let UpdatedCmt = {
            content: content || '',
            cmttype: cmttype || 'Feedback',
            user: req.userId
        }
        const CmtUpdateCondition = { _id: req.params.cmtId, post: req.params.postId, user: req.userId }
        UpdatedCmt = await Cmt.findOneAndUpdate(CmtUpdateCondition, UpdatedCmt, { new: true })

        if (!UpdatedCmt)
            return res.status(401).json({ success: false, message: 'Cannot Update Comment' })
        res.json({ success: true, message: 'Update success', post: UpdatedCmt })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "MongoDB error" })
    }
})
//delete
// Delete a Cmt and its associated Posts. This is a DELETE and should return 204 if the Post is found and no error otherwise
router.delete('/:postId/:cmtId', verifyToken, async (req, res) => {
    try {
        const CmtDeleteCondition = { _id: req.params.cmtId, post: req.params.postId, user: req.userId }
        const DeleteCmt = await Cmt.findOneAndDelete(CmtDeleteCondition)

        if (!DeleteCmt)
            return res.status(401).json({ success: false, message: 'Cannot Find Post to Delete' })
        res.json({ success: true, message: 'Delete success' })

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "MongoDB error" })
    }
})

module.exports = router