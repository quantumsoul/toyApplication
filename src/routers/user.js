const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const sharp = require('sharp')
const router = new express.Router()

router.post('/signup',async (req,res)=>{
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        const data = {token:token}
        res.status(201).send(data)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.post('/login',async (req,res)=>{
    try {
        const user = await User.schema.statics.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        const data = {token:token}
        res.send(data)
    } catch (error) {
        res.status(400).send()
    }
})
router.post('/logout',auth,async (req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send()
    }
})
router.get('/me', auth, async (req,res)=>{
    res.send(req.user)
})

router.patch('/me', auth, async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'age', 'password']
    const isAllowed = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })
    if(!isAllowed){
        return res.status(400).send({'error': 'Invalid updates!'})
    }
    try {
        updates.forEach((update)=>{
            req.user[update]=req.body[update]
        })
        await req.user.save()
        res.send(req.user)
    } catch (error) {
        res.status(400).send()
    }
})
router.delete('/me', auth, async (req,res)=>{
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (error) {
        res.status(500).send()
    }
})
module.exports = router