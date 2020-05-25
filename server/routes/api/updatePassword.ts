import {Router} from 'express';
import User from "../../models/User";
import bcrypt from "bcryptjs";

const router = Router();

router.put('/', (req, res) => {
  const {email} = req.body;
  User.findOne({email}).then(user => {
    if (user) {
      bcrypt.genSalt(10).then(salt => {
        bcrypt.hash(req.body.password, salt).then(hash => {
          User.findOneAndUpdate({"_id": user.id}, {
            password: hash,
            resetPasswordToken: null,
            resetPasswordExpires: null
          }, {new: true}).then(user => {
            console.log(user)
            console.log('password updated');
            res.status(200).send({updated: true})
          });
        })
      })
    } else {
      res.status(404).json('no user exists in db to update')
    }
  })
})

export default router;
