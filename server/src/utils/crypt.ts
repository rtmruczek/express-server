import crypto from 'crypto';

export async function hashPassword(password: string): Promise<string | null> {
  crypto.scrypt(password, process.env.SALT as string, 32, (err, key) => {
    if (err) {
      throw err;
    }
    return key.toString();
  });
  return null;
}
