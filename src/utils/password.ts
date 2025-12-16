import bcrypt from 'bcrypt';

const comparePassword = (plain: string, hash: string) => bcrypt.compare(plain, hash);

const hashPassword = (plain: string) => bcrypt.hash(plain, Number(process.env.BCRYPT_SALT_ROUNDS));

export {comparePassword, hashPassword};