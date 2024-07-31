const JWT=require('jsonwebtoken');
const jwtAuth=async (req,res,next){
    const token=(res.cookie && res.cookie.token)||null;
    if(!token){
        res.status(400).json({
            success:false,
            message:"Not authorized"
        })
    }
    try{
        const payload=JWT.verify(token,process.env.SECRET);
        req.body={id:payload.id,email:payload.email};
        
    }
    catch(e){
        res.status(400).json({
            success:false,
            message:e.message
        })
    }
    next();
}
module.exports=jwtAuth;