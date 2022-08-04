const userModel = require('../models/user.model')

exports.getAllUsers = async (req,res) => {
    const all_users = await userModel.find()
    res.send(all_users)
}

exports.postNewUser = async (req,res) => {
    const new_user = new userModel({
        name: req.body.name,
        content: req.body.content
    })
    await new_user.save()
    res.send(new_user)
}

exports.getUserByID = async(req,res) => {
    try{
        const one_user = await userModel.findOne({ _id: req.params.id })
        res.send(one_user)
    } catch {
        res.status(404)
        res.send({ error: "User doesn't exist!" })
    }
}

exports.editUserByID = async(req,res) => {
    try {
        const edit_user = await userModel.findOne({ _id: req.params.id })
    
        if (req.body.name) {
            edit_user.name = req.body.name
        }
    
        if (req.body.content) {
            edit_user.content = req.body.content
        }
    
        await edit_user.save()
        res.send(edit_user)
    } catch {
        res.status(404)
        res.send({ error: "User doesn't exist!" })
    }
}

exports.deleteUserByID = async (req,res) => {
    try {
        await userModel.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
    }
}