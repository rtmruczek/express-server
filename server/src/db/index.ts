import { User } from '.prisma/client';
import * as prisma from './prisma';
import * as InMemory from './InMemory';

export type DatabaseType = 'Prisma' | 'InMemory';

const db = getDatabaseUsing(process.env.db as DatabaseType);
export interface Database {
  connect: () => any;
  getUniqueUserByEmail: (email: string) => Promise<User | null>;
  createUser: (email: string, password: string) => Promise<User>;
}

export function getDatabaseUsing(databaseType: DatabaseType): Database {
  switch (databaseType) {
    case 'Prisma':
      return {
        connect: () => {
          return;
        },
        getUniqueUserByEmail: (email: string) =>
          prisma.getUniqueUserBy('email', email),
        createUser: (email: string, password: string) =>
          prisma.createUser({ email, password }),
      };
    case 'InMemory': {
      return {
        connect: () => {
          return;
        },
        getUniqueUserByEmail: (email: string) =>
          InMemory.getUniqueUserByEmail(email),
        createUser: (email: string, password: string) =>
          InMemory.createUser({ email, password }),
      };
    }
  }
}

export default db;
