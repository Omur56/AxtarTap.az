import User from "../backend/models/user"
import bcrypt from "bcryptjs"
export const registerUser = async (req,res)=>{
    try {
        const {name,email,mobile,password}=req.body
        if(!name || !email || !mobile || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }

        const hashed=await bcrypt.hash(password,10)
        const user=new User({
            name,
            email,
            mobile,
            password:hashed
        });
        await user.save();
        res.status(201).json({message:"User registered successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"})
    }
}