import { User } from '../users/entities/user.entity';

export type AccessTokenPayload = Pick<User, 'id' | 'email' | 'role'>