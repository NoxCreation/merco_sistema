import crypto from 'crypto'

export function generateHash(password: string) {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}