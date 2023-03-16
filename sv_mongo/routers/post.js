const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const verifyToken = require("../middleware/auth")

//add post
router.post('/',verifyToken,async(req, res) => 
{
    const{title, pdesc,url,status} = req.body
    if(!title)
    return res.status(400).json({success:false, message:"Tittle is needed"})

    try {
        const newPost = new Post({
            title,
			pdesc,
			url: url.startsWith('https://') ? url : `https://${url}`,
            status: status || 'will do',
            user: req.userId})
             await newPost.save()
             res.json({success:true, message:"Posted",post:newPost})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:"MongoDB error"})
    }
})

//show post
router.get('/',verifyToken,async(req, res) => 
{
    try {
        const posts = await Post.find({user: req.userId}).populate('user',['username'])
        res.json({succes: true, posts})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:"MongoDB error"})
    }
})

//update post
router.put('/:id',verifyToken,async(req, res) => 
{
    const{title, pdesc,url,status} = req.body
    if(!title)
    return res.status(400).json({success:false, message:"Tittle is needed"})
    try {
        let UpdatedPost = {
            title,
			pdesc: pdesc || '',
			url: (url.startsWith('https://') ? url : `https://${url}`) || '',
            status: status || 'will do'}
            const postUpdateCondition = {_id: req.params.id, user: req.userId}
            UpdatedPost = await Post.findOneAndUpdate(postUpdateCondition,UpdatedPost,{new:true})

            if(!UpdatedPost)
            return res.status(401).json({success:false, message: 'Cannot Update Post'})
            res.json({success: true, message: 'Update success', post: UpdatedPost})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:"MongoDB error"})
    }
})
//delete post
router.delete('/:id',verifyToken,async(req, res) => 
{
    try {
            const postDeleteCondition = {_id: req.params.id, user: req.userId}
            const DeletePost = await Post.findOneAndDelete(postDeleteCondition)

            if(!DeletePost)
            return res.status(401).json({success:false, message: 'Cannot Find Post to Delete'})
            res.json({success: true, message: 'Delete success'})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:"MongoDB error"})
    }
})


module.exports = router