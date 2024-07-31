const express=require('express');
const jwtAuth=require('../Middleware/middleware.js');
const {Signup,signin,getUser}=require('../controllers/userControllers.js');
const router=express.Router();
//router.get('/',home);
router.post('/signup',Signup);
router.post('/signin',signin);
router.get('/getuser',jwtAuth,getUser);
module.exports=router;
