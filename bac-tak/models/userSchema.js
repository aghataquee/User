const mongoose=require('mongoose');
const JWT=require('jsonwebtoken');
const {Schema}=mongoose;
const userschema=new Schema({
    name:{
        type:String,
        required:[true,"name is required"],
        maxLength:[30,"name should be lesser than 30"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        select:false
    },
    forgotPasswordToken:{
        type:String
    },
    forgotPasswordExpiryDate:{
        type:Date
    }

},
{
    timestamps:true
})
userschema.pre('save',async function(){
    if(!this.isModified('password'))return next();
    this.password=await bcrypt.hash(this.password,10);
    return next();
})
userschema.methods={
    jwtToken(){
        return JWT.sign({id:this._id,email:this.email}),
        process.env.SECRET,
        {expiresIn:'24h'}
    }
}
module.exports=mongoose.model("user",userschema)