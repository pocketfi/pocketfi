import {User} from './User';

export interface RegisteredUser {
  token: string;
  user: User;
}