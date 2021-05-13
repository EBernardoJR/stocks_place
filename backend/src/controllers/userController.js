const User = require('../models/User')

module.exports ={
    async create(req, res){
        const { name, email, password } = req.body
        if(!name || !email || !password){
            return res.status(400).send()
        }

        await User.create({
            name,
            email,
            password
        }).then((user) => {
            return res.json(user)
        }).catch(e => {
            console.log(e)
            return res.status(500).send()
        })


    }
}