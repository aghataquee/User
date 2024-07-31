const userModel=require('../models/userSchema.js');
const emailvalidator=require('email-validator');
/*exports.home=async (req,res)=>{
    res.send("Hello Taquee")
}*/
exports.Signup=async (req,res,next)=>{
    try{
        const {name ,email,password,confirmpassword}=req.body;
        if(!name||!email||!password||!confirmpassword){
            res.status(400).json({
                success:false,
                message:"every field is required"
            })
        }
        const validemail=emailvalidator.validate(email);
        if(!validemail){
            res.status(400).json({
                success:false,
                message:"Hey Plz provide valid email"
            })
        }
        if(password!==confirmpassword){
            res.status(400).json({
                success:false,
                message:"password and confirmpassword does not match"
            })
        }
        const userInfo=userModel(req.body);
        const user=await userInfo.save();
        return res.status(200).json({
            success:true,
            message:"User successfully registered",
            user
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        })
    };
    

}
exports.signin=async (req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        res.status(400).json({
            success:false,
            message:"above fields are required"
        })
    }
    try{
        const user=await userModel.findOne({
        email})
        .select('+password');
        if(!user||user.password!==password){
            res.status(400).json({
                success:false,
                message:"invalid credentials"
            })
        }
        const token=user.jwtToken();
        user.password=undefined;
        const cookieoptions={
            maxAge:24*60*60*1000,
            httpOnly:true
        }
        res.cookie("token",token,cookieoptions);
        res.status(200).json({
            success:true,
            message:"user logged in successfully",
            user
        })
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })
    }

}
exports.getUser=async (req,res)=>{
    const userId=user.req.body;
    try{
        const User=await userModel.findById(userId);
        res.status(200).json({
            success:true,
            message:"Details of user",
            User
        })
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:error.message
        })
    }
}
exports.logout=async (req,res,next)=>{
    try{
        const cookieoptions={
            maxAge:new Date(),
            httpOnly:true
        }
        res.cookie('token',null,cookieoptions);
        res.status(200).json({
            success:true,
            message:'user logout successfully'
        })
    }catch(err){
        res.status(400).json({
            success:false,
            message:err.message
        })

    }


}
