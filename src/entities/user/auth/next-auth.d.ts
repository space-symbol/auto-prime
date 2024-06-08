import { UserEntity } from '../_domain/types';

declare module 'next-auth' {
  interface Session {
    user: UserEntity;
  }
  interface User extends UserEntity {}
}
