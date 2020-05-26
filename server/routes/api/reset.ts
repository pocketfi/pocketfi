import {Router} from 'express';
import User from "../../models/User";
import {IUser} from "../../types/interfaces/IUser";
const router = Router();

router.get('/', (req, res)=> {
  console.log(req.query.resetPasswordToken)
  User.findOne({
    resetPasswordToken: req.query.resetPasswordToken.toString(),
    resetPasswordExpires: {$gt: new Date()}
  }).then((user: IUser) => {
    if (!user) {
      res.json('password reset link is invalid or has expired')
    } else {
      res.status(200).send({
        email: user.email,
        resetLink: true
      })
    }
  })
})

export default router;