const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const verifyToken = require("../middleware/auth")

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
module.exports = router