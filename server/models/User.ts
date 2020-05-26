import {Schema, model} from 'mongoose';
import {IUser} from "../types/interfaces/IUser";

const UserSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String
    },
    register_date: {
      type: Date,
      default: Date.now
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    }
  },
  {
    _id: true,
    id: true, toJSON: {
      virtuals: true,
      versionKey: true
    }
  }
);

const User = model<IUser>('user', UserSchema);

export default User;