import user from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import emailToken from '../models/emailTokenModel.js';
import {sendEmail} from '../utils/sendEmail.js';
import crypto from 'crypto';

export const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    let existingUser = await user.findOne({ email });
    if (existingUser){
      return res.status(401).json({ message:'User already exists'});
    }
    const fullname = firstname + ' ' + lastname;
    const newuser = new user({ email, password, name: fullname });
    let newUser=await newuser.save();

    const newToken = crypto.randomBytes(32).toString("hex");
    const email_token=new emailToken({
      userId:newUser._id,
      token:newToken
    })
    await email_token.save()
    const url=`${process.env.BASE_URL}/auth/verify/${newUser._id}/${email_token.token}`;
    await sendEmail(newUser.email,"Verify Your Email",url)
    res.status(201).json({message:'Success'})

  } catch (error) {
    console.log('Error in register ' + error);
    res.status(500).send(error);
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const valid = await user.findOne({ email });
    if (!valid) {
      res.status(200).json({ message: 'User does not exist' });
      return
    }
    const validPassword = await bcrypt.compare(password, valid.password);
    if (!validPassword) {
      res.status(200).json({ message: 'Invalid Credentials' });
      return
    }
    const verified=valid.verified
    if (!verified){
      let id=valid._id
      let existingToken=await emailToken.deleteOne({ userId:id })
      const newToken = crypto.randomBytes(32).toString("hex");
      const email_token=new emailToken({
        userId:valid._id,
        token:newToken
      })
      await email_token.save()
      const url=`${process.env.BASE_URL}/auth/verify/${valid._id}/${email_token.token}`;
      await sendEmail(valid.email,"Verify Your Email",url)
      res.status(201).json({message:'Email Sent for Verification'})
    }
    else {
      const token = await valid.generateAuthToken();
      await valid.save();
      res.cookie('userToken', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({ token: token, status: 200 });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const validUser = async (req, res) => {
  try {
    const validuser = await user
      .findOne({ _id: req.rootUserId })
      .select('-password');
    if (!validuser) res.json({ message: 'user is not valid' });
    res.status(201).json({
      user: validuser,
      token: req.token,
    });
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};


export const logout = (req, res) => {
  req.rootUser.tokens = req.rootUser.tokens.filter((e) => e.token != req.token);
};
export const searchUsers = async (req, res) => {
  // const { search } = req.query;
  const search = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { email: { $regex: req.query.search, $options: 'i' } },
        ],
      }
    : {};

  const users = await user.find(search).find({ _id: { $ne: req.rootUserId } });
  res.status(200).send(users);
};
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const selectedUser = await user.findOne({ _id: id }).select('-password');
    res.status(200).json(selectedUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
export const updateInfo = async (req, res) => {
  const { id } = req.params;
  const { bio, name } = req.body;
  const updatedUser = await user.findByIdAndUpdate(id, { name, bio });
  return updatedUser;
};

export const verifyUser=async (req,res)=>{
  try{
    const foundUser=await user.findOne({_id:req.params.id})
    if (!foundUser){
      return res.status(400).json({message:"Invalid Link"});
    }
    const foundEmailToken= await emailToken.findOne({
      userId:foundUser._id,
      token:req.params.token
    });
    if (!foundEmailToken){
      return res.status(401).json({message:"Invalid Link"})
    }
    await foundUser.updateOne({id:foundUser._id,verified:true})
    await foundEmailToken.remove()
    res.status(200).json({message:'Email Verified Successully'})
  }catch(error){
    console.log('Error in verification ' + error);
    res.status(500).send(error);
  }
}
