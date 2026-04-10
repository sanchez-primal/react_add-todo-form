import { User } from '../types/User';
import users from '../api/users';

export function assignUserToObject<T extends { userId: number }>(
  object: T,
): T & { user: User | null } {
  return {
    ...object,
    user: users.find(user => user.id === object.userId) || null,
  };
}
