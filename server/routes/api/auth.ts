import {Router} from 'express';
import bcrypt from 'bcryptjs';
import config from '../../config';
import jwt from 'jsonwebtoken';
import User from '../../models/User';

const router = Router();

export const tokenGeneration = (id: string) => {
  const token = jwt.sign(
    {id: id},
    config.JWT_SECRET,
    {expiresIn: 3600}
  );
  console.log(token);
  return token;
};

router.post('/', (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({msg: 'Please enter all fields'});
  }

  User.findOne({email}).then(user => {
    if (!user) return res.status(400).json({msg: 'User does not exist'});

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({msg: 'Invalid credentials'});
      const token = tokenGeneration(user.id);
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    });
  });
});

router.post('/google', (req, res) => {
  const {email, firstName} = req.body;
  console.log(email, firstName);

  User.findOne({email}).then(user => {

    if (!user) {
      user = new User({
        name: firstName,
        email: email
      });
      user.save();
    }

    const token = tokenGeneration(user.id);

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  });
});

export default router;
