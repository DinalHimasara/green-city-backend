import bcrypt from "bcrypt"
import User from "../model/user.js"
import jwt from "jsonwebtoken"
import { response } from "express"



export function getUser(req,res){
    if(req.user == null || req.user.role != "admin"){
        res.status(401).json({
            message : "Unauthorized Acess",
            token : req.user
        })
        return
    }
    User.find().then(
        (users)=>{
            res.json(users)
        }
    )
}

export function createUser(req,res){
    const data = req.body
    const hashedPassword = bcrypt.hashSync(data.password, 10)

    const user = new User(
        {
            nic : data.nic,
            email : data.email,
            firstName : data.firstName,
            lastName : data.lastName,
            password : hashedPassword,
            phone : data.phone,
            address : data.address,
            image : data.image,
            isBlock : data.isBlock,
            role : data.role,
            status : data.status,
            currentLocation : data.currentLocation
        }
    )

    user.save().then(
        ()=>{
            res.json({
                message : "User Createad Sucessfully !"
            })
        }
    ).catch(
        (err)=>{
            console.log(err)
            res.status(400).json({
                error : err.message
            })
        }
    )
}

//Login user function 

export function loginUser(req,res){
    const email = req.body.email
    const password = req.body.password

    User.find(
        {email : email}
    ).then(
        (users)=>{
            if(users[0] == null){
                res.status(404).json({
                    message : "user not found!"
                })
            }
            else{
                console.log(users)
                const user = users[0]


                const isPasswordCorrect = bcrypt.compareSync(password, user.password)

                if(isPasswordCorrect){
                    const payload = {
                        _id: user._id,
                        nic : user.nic,
                        email : user.email,
                        firstName : user.firstName,
                        lastName : user.lastName,
                        role : user.role,
                        isBlock : user.isBlock,
                        isEmailVerified :  user.isEmailVerified,
                        status : user.status
                    }

                    const token = jwt.sign(payload, "green&45")

                    res.status(200).json({
                        message : "LOGIN SUCESSFULL !",
                        token : token,
                        role : user.role
                    })
                }
                else{
                    res.status(401).json({
                        message : "Login failed !"
                    })
                }

            }                

               
        }
    )
}

export async function googleLogin(req,res){
    try{
        const res = await axios.get("",{
            headers :{
                Authorization : `Bearer $(req.body.token)`
            }
        })
        console.log(response.data)

        const user = await User.findOne({email : response.data.email})
        if(user == null){
            const newUser = new User({
                email : response.data.email,
                firstName : response.data.given_name,
                lastName : response.data.family_name,
                password : "123",
                image : response.data.picture
            })
            await newUser.save()

            const payload = {
                email : newUser.email,
                firstName : newUser.firstName,
                lastName : newUser.lastName,
                role : newUser.role,
                isEmailVerified : true,
                image : newUser.image
            }

            const token = jwt.sign(payload, "green&45")

                    res.status(200).json({
                        message : "LOGIN SUCESSFULL !",
                        token : token,
                        role : user.role
                    })

        }
        else{
            const payload = {
                        email : user.email,
                        firstName : user.firstName,
                        lastName : user.lastName,
                        role : user.role,
                        isBlock : user.isBlock,
                        isEmailVerified : user.isEmailVerified,
                        status : user.status
                    }

                    const token = jwt.sign(payload, "green&45")

                    res.status(200).json({
                        message : "LOGIN SUCESSFULL !",
                        token : token,
                        role : user.role
                    })
        }
    }
    catch(error){
        res.status(500).json({
            message : "Goggle Login failed",
            error : error.message
        })
    }

}

export async function updateUserStatus(req,res){
    if(!isAdmin(req)){
        res.status(401).json({
            message : "Unauthorized"
        })
        return
    }

    const email = req.params.email

    if(req.user.email === email){
        res.status(400).json({
            message : "Admin can't change their own status"
        })
        return
    }

    const isBlock = req.body.isBlock

    try{
        await User.updateOne({email : email}, {isBlock:isBlock})
        res.json({
            message : "User Status Changed"
        })
    }
    catch(err){
        res.status(500).json({
            message : "Error updating user status",
            error : "error.message"
        })
    }

}

export function isAdmin(req){
    if(req.user == null || req.user.role != "admin"){
        return false
    }
    return true
}