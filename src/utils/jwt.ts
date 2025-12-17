import jwt, { type Secret, type SignOptions } from 'jsonwebtoken';

export type JwtPayload = {
    id: number;
    userId: number;
    email: string;
};

if (!process.env.JWT_ACCESS_SECRET) {
  throw ('JWT_ACCESS_SECRET is not defined');
}
if (!process.env.JWT_ACCESS_EXPIRES) {
  throw ('JWT_ACCESS_SECRET is not defined');
}

const SECRET: Secret = process.env.JWT_ACCESS_SECRET;

const EXPIRES_IN: SignOptions['expiresIn'] = (process.env.JWT_ACCESS_EXPIRES) as SignOptions['expiresIn'];

if (!SECRET) {
  throw ('JWT_ACCESS_SECRET is not defined');
}
if (!EXPIRES_IN) {
  throw ('JWT_ACCESS_SECRET is not defined');
}

const jwtSignAccessToken = (payload: JwtPayload) =>
    jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });

const jwtVerifyAccessToken = (token: string): JwtPayload => 
    jwt.verify(token, SECRET) as JwtPayload;

export {jwtSignAccessToken, jwtVerifyAccessToken}