const express = require('express')
const Toy = require('../models/toys')
const auth = require('../middleware/auth')
const router = new express.Router()
router.post('/toys', auth, async (req,res)=>{
    const toy = new Toy(req.body)
    try {
        await toy.save()
        res.status(201).send(toy)
    } catch (error) {
        res.status(400)
    }
})
router.get('/toys', auth, async (req,res)=>{
    const name = req.query.name
    try {
        const toy = await Toy.findOne({name})
        if(!toy){
            return res.status(404).send()
        }
        res.send(toy)
    } catch (error) {
        return res.status(500)
    }
})

router.patch('/toys', auth, async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description']
    const isAllowed = updates.every((update)=>{
        return allowedUpdates.includes(update)
    })
    if(!isAllowed){
        return res.status(400).send({'error': 'Invalid updates!'})
    }
    const name = req.query.name
    try {
        const toy = await Toy.findOne({name})
        if(!toy){
            return res.status(404).send()
        }
        updates.forEach((update)=>{
            toy[update] = req.body[update]
        })
        await toy.save()
        res.send(toy)
    } catch (error) {
        res.status(400)
    }
})

router.delete('/toys', auth, async (req,res)=>{
    const name = req.query.name
    try {
        const toy = await Toy.findOneAndDelete({name})
        if(!toy){
            return res.status(404).send({"error":"toy not found!"})
        }
        res.send(toy)
    } catch (error) {
        res.status(500)
    }
})
module.exports = router