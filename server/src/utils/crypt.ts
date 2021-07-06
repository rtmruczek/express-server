import crypto from 'crypto';

export async function hashPassword(password: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, process.env.SALT as string, 32, (err, key) => {
      if (err) {
        reject(err);
      }
      resolve(key.toString());
    });
  });
}
