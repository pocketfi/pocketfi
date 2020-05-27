import {User} from './User';

export interface AuthenticatedUser {
  token: string;
  user: User;
}
