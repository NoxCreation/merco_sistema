import crypto from 'crypto'

export const generateSecret = () => {
    const secret = crypto.randomBytes(64).toString('hex');
    return secret
}