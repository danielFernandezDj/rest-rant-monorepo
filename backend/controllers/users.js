const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')

const { User } = db

router.post('/', async (req, res) => {
    let { password, ...rest} = req.body;
    let passDigest = await bcrypt.hash(password, 10)
    console.log("passDigest test", passDigest)
    const user = await User.create({
        ...rest,
        passwordDigest: passDigest})
    res.json(user)
})


router.get('/', async (req, res) => {
    const users = await User.findAll()
    res.json(users)
})

module.exports = router