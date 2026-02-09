import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import express from 'express'
import User from '../models/user.model.js';

const router = express.Router();

router.post('/register',async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            res.status(400).json({error : "missing credentials"});
            return;
        }
        
        const check = await User.findOne({email});
        if(check){
            res.status(400).json({error:"user already exist"});
            return;
        }
        
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({name,email,password:hashedPassword})
        await newUser.save();
        // use  openssl rand -base64 32 in git bash to get secret
        const token = await jwt.sign({id:newUser._id},process.env.SECRET,{expiresIn:'2h'});
        res.status(201).json({token});
    } catch (error) {
        console.log('error in Register controller');
        res.status(500).json({error : 'internal server error'});
    }
})

router.post('/login', async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({error : "email and password required"});
        }
        const chck =await User.findOne({email});
        if(!chck){
            return res.status(401).json({error : 'wrong email'});
        }
        const isMatch = await bcrypt.compare(password,chck.password);
        if(isMatch){
            const token = jwt.sign({id:chck._id},process.env.SECRET,{expiresIn : '2h'});
            return res.status(200).json({token,name : chck.name,email : chck.email});
        }
        return res.status(401).json({error : 'wrong password'});
    } catch (error) {
        console.log('error in login controller',error.message);
        res.status(500).json({error : 'internal server error'});
    }
})

router.get('/verify',async(req,res)=>{
    try {
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({error : "no token found"});
        }
        const decoded = jwt.verify(token,process.env.SECRET);
        const user = await User.findById(decoded.id).select("name email");
        if(!user){
            return res.status(401).json({error : "invalid token"});
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log('internal server error in verification',error.message);
        return res.status(401).json({error : "expired token"});
    }
})
export default router;