const User = require('../models/User')
const {cloudinary}= require('../utils/cloudinary')
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const crypto= require('crypto')


const update = async (req, res, next) => {
  const { username, email, password, profilePic } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    let user = await User.findById(req.params.id);

    if (profilePic) {
      const uploadRes = await cloudinary.uploader.upload(profilePic, {
        upload_preset: "OnlineTask",
      });

      if (uploadRes) {
        const data = {
          username,
          email,
          password: hashed,
          profilePic: uploadRes,
        };

        user = await User.findByIdAndUpdate(req.params.id, data, { new: true });

        // Generate a new token for the updated user
        const newToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          process.env.JW_TOKEN
        );

        // Send the new token in the response
        res.status(200).json({ user, token: newToken });
      }
    }
  } catch (err) {
    next(err);
  }
};


const deleteAccount= async(req,res,next)=>{
  try{

    await User.findByIdAndDelete(req.params.id)
    res.status(200).json("The user has been deleted")

  }catch(err){
    next(err)
  }
}

module.exports={update, deleteAccount}