import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';

export type JwtPayload = {
    id: number;
    userId: number;
    email: string;
};

type Payload = { id: number; email: string; };

const SECRET: Secret = process.env.JWT_ACCESS_SECRET || "";

const EXPIRES_IN: SignOptions['expiresIn'] = (process.env.JWT_ACCESS_EXPIRES) as SignOptions['expiresIn'];

const REFRESH_SECRET: Secret = process.env.JWT_REFRESH_SECRET || "";

const REFRESH_EXPIRES: SignOptions['expiresIn'] = process.env.JWT_REFRESH_EXPIRES as SignOptions['expiresIn'];

if (!SECRET) {
  throw ('SECRET is not defined');
}
if (!EXPIRES_IN) {
  throw ('EXPIRES_IN is not defined');
}
if (!REFRESH_SECRET) {
  throw ('REFRESH_SECRET is not defined');
}
if (!REFRESH_EXPIRES) {
  throw ('REFRESH_EXPIRES is not defined');
}

// tworzenie tokenu
const jwtSignAccessToken = (payload: Payload) =>
    jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });

// weryfikacja tokenu
const jwtVerifyAccessToken = (token: string): JwtPayload => 
    jwt.verify(token, SECRET) as JwtPayload;
// tworzenie refresh tokenu
const jwtSignRefreshToken = (payload: Payload) =>
  jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES });
// weryfikacja refresh tokenu
const jwtVerifyRefreshToken = (token: string): JwtPayload =>
  jwt.verify(token, REFRESH_SECRET) as JwtPayload;

export {jwtSignAccessToken, jwtVerifyAccessToken, jwtSignRefreshToken, jwtVerifyRefreshToken}