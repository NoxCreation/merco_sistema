import crypto from 'crypto'
import bcrypt from 'bcrypt'

/* export function generateHash(password: string) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
} */

export async function generateHash(password: string) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function checkPassword(password: string, hashedPassword: string) {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
}
