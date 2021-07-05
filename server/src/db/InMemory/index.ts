import { Prisma, User } from '.prisma/client';
import { v4 as uuidv4 } from 'uuid';

interface Session {}
interface Database {
  User: Record<string, User>;
  Session: Record<string, Session>;
}

let db: Database = {
  User: {},
  Session: {},
};

type DatabaseTypes = Prisma.UserSelect;

export async function createUser(value: Prisma.UserCreateInput) {
  const id = uuidv4();
  const user = {
    ...value,
    id,
    name: value.name ?? null,
    createdAt: new Date(),
  };
  db.User[id] = user;
  return user;
}

export function getUserById(id: string): User {
  return db.User[id];
}

export async function getUniqueUserByEmail(
  email: string
): Promise<User | null> {
  const users = Object.values(db.User);
  const filteredUsers = users.filter((user) => user.email === email);
  if (filteredUsers.length > 1) {
    throw new Error('Collision');
  }
  if (filteredUsers.length === 0) {
    return null;
  }
  return filteredUsers[0];
}
