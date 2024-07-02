const User = require("../models/user");
const Link = require("../models/link");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const { IMAGE_DIRECTORY } = require("../utils/constants");

const logoutUser = async(req, res)=>{
    try{
        req.user.token = '';
        await req.user.save();

        return res.send();
    }catch(error){
        console.log(error);
        return res.status(500).send("Error while logging out. Try again later");
    }
}

const getPublicProfile = async(req, res)=>{
    try{
        const { id } = req.params;
        const userProfile = await User.findOne({
            email: new RegExp(id, 'gi')
        });

        const links = await Link.find({
            user: userProfile._id
        }).sort({order: 1});

        return res.send({
            profile: {
                _id: userProfile?._id,
                first_name: userProfile?.first_name,
                last_name: userProfile?.last_name,
                email: userProfile?.email,
                profileImage: userProfile?.profileImage,
            },
            links
        })
    }catch(error){
        console.log(error);

        return res.status(500).send("Unable to get Profile. Try again later.");
    }
}

const updateUserProfile = async(req, res)=>{
    try{
        const { profileImage, first_name, last_name } = req.body;
        if(profileImage){
            const parts = req.user.profileImage.split('/');
            const fileName = parts[parts.length - 1];
            const imageId = fileName.split('.')[0];

            // delete previously uploaded image
            await cloudinary.uploader.destroy(`${IMAGE_DIRECTORY}/${imageId}`,
                {
                    resource_type: 'image'
                }
            )

            const uploadedImage = await cloudinary.uploader.upload(profileImage, {
                folder: IMAGE_DIRECTORY
            });

            const generatedImgURL = uploadedImage.secure_url;

            req.user.profileImage = generatedImgURL;

            await req.user.save();
        }

        const updatedUser = await User.findByIdAndUpdate(
        {_id: req.user._id},
        {
            first_name,
            last_name,
        },
        { new: true }
        );

        return res.send(updatedUser);

    }catch(error){
        res.status(500).send("Unable to update profile. Try again later.");
    }
}


const getUserProfile = (req, res)=>{
    try{
        console.log(req.user);
        return res.send(req.user);
    }catch(error){
        return res.status(500).send("Error in getting profile. Try again later");
    }
}


const createUser = async(req, res)=>{
    try{
        const { email, password } = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
           return res.status(400).send("User already exists.")
        }

        const encodedPassword = await bcrypt.hash(password, 8);
        const newUser = await User.create({email, password: encodedPassword});

        return res.status(200).send(newUser);

    }catch(error){
        res.status(500).send("Error while registering the user");
    }
}

const loginUser = async(req, res)=>{
    try{
        const { email, password } = req.body;
        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(404).send("You don't have any account. Please register")
        }

        const equal = await bcrypt.compare(password, existingUser.password);    
        if(!equal){
            return res.status(402).send("Invalid credentials.");
        }

        const token = jwt.sign({_id: existingUser._id}, process.env.JWT_SECRET_KEY);

        existingUser.token = token;
        existingUser.save();

        return res.cookie("token", token, {
            secure: true,
            httpOnly: true
        }).send(existingUser)
    }catch(error){
        console.log(error);
        return res.status(500).send("Error while logging in.");
    }
}

module.exports = { createUser, loginUser, getUserProfile, updateUserProfile, getPublicProfile, logoutUser };