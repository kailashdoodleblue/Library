const jwt = require('jsonwebtoken');
const verifytoken = (req,res,next)=>{
    try{
        const token =req.headers.authorization
        jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if (err){
                return res.status(401).json({Error : 'Token not valid'})
            }
            else{
                if(decode.username =="admin"){
                    next()
                }
                else{
                    return res.status(401).json({ error: 'User dont have access' });
                }
            }
        })
        
    }
    catch(err){

    }
}
module.exports={verifytoken}