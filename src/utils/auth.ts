import * as jose from 'jose';
import crypto from 'crypto';

const JWT_SECRET = crypto.randomBytes(32);

export function generateAuthorizationCode(): string {
  return crypto.randomBytes(16).toString('hex');
}

export async function generateTokens() {
  const secret = new Uint8Array(JWT_SECRET);

  const accessToken = await new jose.SignJWT({
    sub: 'user123',
    iat: Math.floor(Date.now() / 1000),
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1h')
    .sign(secret);

  const refreshToken = crypto.randomBytes(32).toString('hex');

  return {
    accessToken,
    refreshToken
  };
} 