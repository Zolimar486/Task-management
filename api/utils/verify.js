
const jwt= require('jsonwebtoken')


const verifyToken= (req,res,next)=>{  
  
const authHeader = req.headers.token 

if(authHeader){

  const token = authHeader.split(" ")[1]

  jwt.verify(token, process.env.JW_TOKEN, (err, user)=>{
    if (err) {
      console.log("Token verification error:", err);
      return res.status(404).json("Token is invalid");
    }

    console.log("Token verified successfully", token);
    req.user = user;
    next();
  })

}else{
  res.status(404).json("you are not authenticated")
}

  

}


const verifyUser = (req,res,next)=>{
  verifyToken(req,res,next, ()=>{
    if(req.user.id ===  req.params.id || req.user.isAdmin){
      
      next()
    }else{
     
      res.status(404).json("You are not allowed to do that")
    } 
  })
}


module.exports= {verifyUser, verifyToken}
