const bcrypt= require('bcrypt')
const User = require('../models/User')
const {cloudinary} = require('../utils/cloudinary')
const jwt= require('jsonwebtoken')

//Register Process
const register = async(req, res, next)=>{
  const {username, email, password, profilePic}= req.body;

  try{
   const salt = await bcrypt.genSalt(10)
   const hashed= await bcrypt.hash(req.body.password, salt)

  if(profilePic){
    const uploadRes= await cloudinary.uploader.upload(profilePic, {
      upload_preset:"OnlineTask"
    })


    if(uploadRes){
      const newUser= new User( {
        username,
        email,
        password: hashed,
        profilePic:uploadRes,
      })

      

      const saveUser= await newUser.save()

      res.status(200).json(saveUser)
      console.log("user", saveUser)
    }

    
  }

   
  }catch(err){
   
    next(err)
  }

}

///

const login = async (req, res, next) => {
   
  

  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json("Wrong Credential");
    }

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) {
      return res.status(404).json("Wrong Credential");
    }

    

    
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        
      },
      process.env.JW_TOKEN
    );

    
 console.log('Generated Token:', token);

    const {isAdmin, ...othersDetails}= user._doc;
   

    res.status(200).json({ ...othersDetails, isAdmin, token});
  } catch (err) {
    console.log("error");
    next(err);
  }
}; 


const google = async (req, res, next) => {
  try {
    // Assuming the Google user's name is available in req.body.name
    const userName = req.body.name; 

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({
        id: user._id
      }, process.env.JW_TOKEN);

      const { isAdmin, ...othersDetails } = user._doc;

      res.status(200).json( { ...othersDetails, username: userName , isAdmin, token});
    } else {
      // If the user doesn't exist, create a new user
      const generatePassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatePassword, 10);

      const newUser = new User({
        username: userName, // Use the extracted user name here
        email: req.body.email,
        password: hashedPassword, 
        profilePic: req.body.photo
      });

      await newUser.save();
      const token = jwt.sign({
        id: newUser._id 
      }, process.env.JW_TOKEN);

      const { isAdmin, ...newUserDetails } = newUser._doc;

      res.status(200).json({ ...newUserDetails, username: userName , isAdmin, token} );
    }
  } catch (err) {
    next(err);
  }
};

module.exports= {register, login, google}