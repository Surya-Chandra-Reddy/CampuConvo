import jwt from 'jsonwebtoken';
import user from '../models/userModel.js';

export const Auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(' ')[0]; // When using browser, this line
    // let token = req.headers.authorization.split(' ')[1]; // When using Postman, this line
    if (token.length < 500) {
      const verifiedUser = jwt.verify(token, process.env.SECRET);
      const rootUser = await user.findOne({ _id: verifiedUser.id }).select('-password');
      req.token = token;
      req.rootUser = rootUser;
      req.rootUserId = rootUser._id;

      // Check if the email domain ends with "@pvkkit.ac.in"
      if (!rootUser.email.endsWith('@pvkkit.ac.in')) {
        return res.status(403).json({ error: 'Access Forbidden: Only PVKKIT email addresses are allowed.' });
      }
    } else {
      let data = jwt.decode(token);
      req.rootUserEmail = data.email;
      const googleUser = await user.findOne({ email: req.rootUserEmail }).select('-password');
      req.rootUser = googleUser;
      req.token = token;
      req.rootUserId = googleUser._id;

      // Check if the email domain ends with "@pvkkit.ac.in"
      if (!req.rootUserEmail.endsWith('@pvkkit.ac.in')) {
        return res.status(403).json({ error: 'Access Forbidden: Only PVKKIT email addresses are allowed.' });
      }
    }
    next();
  } catch (error) {
    // console.log(error);
    res.status(401).json({ error: 'Invalid Token' });
  }
};
